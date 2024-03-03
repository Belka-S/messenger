const { doc, updateDoc } = require('firebase/firestore');

const { Users } = require('../../db');
const { getDocByRef, HttpError } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const logout = ctrlWrapper(async (req, res) => {
  const { email } = req.user;

  const userRef = doc(Users, email);
  await updateDoc(userRef, { accessToken: null });

  const user = await getDocByRef(userRef);
  if (!user) throw HttpError(403, 'Failed to log out');

  res.status(200).json({ message: `Logged out` });
});

module.exports = logout;
