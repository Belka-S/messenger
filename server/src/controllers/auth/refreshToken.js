const { doc, updateDoc } = require('firebase/firestore');
const jwt = require('jsonwebtoken');

const { Users } = require('../../db');
const { ctrlWrapper } = require('../../decorators');
const { getDocByRef, HttpError } = require('../../utils');
const { TOKEN_ACCESS_SECRET, TOKEN_REFRESH_SECRET } = process.env;

const refreshToken = ctrlWrapper(async (req, res, next) => {
  const { refreshtoken } = req.headers; // const { refreshtoken } = req.body;
  try {
    const { email } = jwt.verify(refreshtoken, TOKEN_REFRESH_SECRET);

    const userRef = doc(Users, email);
    const user = await getDocByRef(userRef);
    const candidate = { accessToken: null, refreshToken: null };

    if (!user || !user.verifiedEmail || !user.refreshToken || user.refreshToken !== refreshtoken) {
      res.status(403).json({ message: 'Forbidden', result: { user: candidate } });
    } else {
      candidate.accessToken = jwt.sign({ email }, TOKEN_ACCESS_SECRET, { expiresIn: '60s' });
      candidate.refreshToken = jwt.sign({ email }, TOKEN_REFRESH_SECRET, { expiresIn: '7d' });

      await updateDoc(userRef, { ...candidate });
      const newUser = await getDocByRef(userRef);

      res.status(200).json({ result: { user: newUser } });
    }
  } catch {
    next(HttpError(403));
  }
});

module.exports = refreshToken;
