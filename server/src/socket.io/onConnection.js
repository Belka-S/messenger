const { elementHandler, userHandler, fileHandler } = require('./handlers');

const onConnection = socket => {
  elementHandler(socket);
  fileHandler(socket);
  userHandler(socket);
};

module.exports = onConnection;
