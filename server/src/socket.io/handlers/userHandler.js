const userHandler = socket => {
  // sign in user
  socket.on('joinUser', msg => {
    socket.broadcast.emit('joinUser', msg);
  });
  // sign out user
  socket.on('leftUser', msg => {
    socket.broadcast.emit('leftUser', msg);
  });
};

module.exports = userHandler;
