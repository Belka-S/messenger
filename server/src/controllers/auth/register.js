const { doc, setDoc, getDoc } = require('firebase/firestore');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Users } = require('../../db');

const { getDocByRef, HttpError, randomNumber, sendMail, createMsg } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const { TOKEN_REFRESH_SECRET } = process.env;
const register = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const userRef = doc(Users, email);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    throw HttpError(409, 'Email already exists');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = randomNumber(6).toString();
  const msg = createMsg('verifyEmail.ejs', { email, verificationCode });
  await sendMail.nodemailer(msg);
  const refreshToken = jwt.sign({ email }, TOKEN_REFRESH_SECRET, { expiresIn: '7d' });

  await setDoc(userRef, {
    ...req.body,
    password: hashPassword,
    verificationCode,
    refreshToken,
  });
  const user = await getDocByRef(userRef);

  res.status(201).json({
    message: `Verification code sent to ${user.email}`,
    result: { user },
  });
});

module.exports = register;
