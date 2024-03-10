const { elementHandler, userHandler } = require('./handlers');

const onConnection = socket => {
  userHandler(socket);
  elementHandler(socket);
};

module.exports = onConnection;
