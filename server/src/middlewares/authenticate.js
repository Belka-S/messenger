const jwt = require('jsonwebtoken');

const { getDocById, HttpError } = require('../utils');
const { Users } = require('../db');

const { TOKEN_ACCESS_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, accessToken] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }

  try {
    const { email } = jwt.verify(accessToken, TOKEN_ACCESS_SECRET);
    const user = await getDocById(Users, email);

    if (!user || !user.accessToken || user.accessToken !== accessToken) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
