require('dotenv').config();
const { createServer } = require('http');

const { Server } = require('socket.io');

const { PORT_WS = 5000 } = process.env;

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

/* eslint-disable no-console */
io.on('connection', socket => {
  socket.on('chatMessage', msg => {
    socket.broadcast.emit('chatMessage', msg);
  });
});

(() => {
  try {
    httpServer.listen(PORT_WS, () => console.log(`  -> Server WS:  http://localhost:${PORT_WS}/`));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
