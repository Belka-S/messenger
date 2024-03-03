const fs = require('fs/promises');

const moment = require('moment');

const logFile = (req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  fs.appendFile('./server.log', `${method} ${url} ${date}\n`);
  next();
};
module.exports = logFile;
