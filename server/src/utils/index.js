const createMsg = require('./createMsg');
const getDocById = require('./getDocById');
const getDocByRef = require('./getDocByRef');
const getDocsList = require('./getDocsList');
const HttpError = require('./HttpError');
const joiError = require('./joiError');
const logFile = require('./logFile');
const randomNumber = require('./randomNumber');
const regExp = require('./regExp');
const renderEjsTemplate = require('./renderEjsTemplate');
const sendMail = require('./sendMail');

module.exports = {
  createMsg,
  getDocById,
  getDocByRef,
  getDocsList,
  HttpError,
  joiError,
  logFile,
  randomNumber,
  regExp,
  renderEjsTemplate,
  sendMail,
};
