const { doc, updateDoc } = require('firebase/firestore');

const { Users } = require('../../db');
const { ctrlWrapper } = require('../../decorators');
const { getDocByRef, HttpError } = require('../../utils');

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { email, verificationCode } = req.body;

  const userRef = doc(Users, email);
  const user = await getDocByRef(userRef);

  const code = user.verificationCode;
  if (code !== verificationCode) {
    throw HttpError(403, `Failed to verify ${user.email}`);
  }

  const candidate = { verifiedEmail: true, verificationCode: null };
  await updateDoc(userRef, { ...candidate });

  const newUser = getDocByRef(userRef);
  if (!newUser.verifiedEmail) {
    throw HttpError(403, `Failed to verify ${user.email}`);
  }

  res.status(200).json({ message: `Email verified`, result: { user: newUser } });
});

module.exports = verifyEmail;
