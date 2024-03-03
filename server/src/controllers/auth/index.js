const getUser = require('./getUser');
const login = require('./login');
const logout = require('./logout');
const refreshToken = require('./refreshToken');
const register = require('./register');
const verifyEmail = require('./verifyEmail');

module.exports = {
  getUser,
  login,
  logout,
  refreshToken,
  register,
  verifyEmail,
};
