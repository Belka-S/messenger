const { doc, updateDoc } = require('firebase/firestore');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Users } = require('../../db');
const { getDocByRef, HttpError, sendMail, createMsg } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const { TOKEN_ACCESS_SECRET, TOKEN_REFRESH_SECRET } = process.env;

const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const userRef = doc(Users, email);
  const user = await getDocByRef(userRef);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw HttpError(401);

  const { verifiedEmail, verificationCode } = user;
  if (!verifiedEmail) {
    const msg = createMsg('verifyEmail.ejs', { email, verificationCode });
    await sendMail.nodemailer(msg);

    res.status(200).json({
      message: `Verification code sent to ${user.email}`,
      result: { user },
    });
  } else {
    const accessToken = jwt.sign({ email }, TOKEN_ACCESS_SECRET, { expiresIn: '6000s' });
    const refreshToken = jwt.sign({ email }, TOKEN_REFRESH_SECRET, { expiresIn: '7d' });

    await updateDoc(userRef, { accessToken, refreshToken });
    const newUser = await getDocByRef(userRef);

    res.status(200).json({
      message: `Signed in: ${newUser.email}`,
      result: { user: newUser },
    });
  }
});

module.exports = login;
