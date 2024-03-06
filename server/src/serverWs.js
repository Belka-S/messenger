require('dotenv').config();
const { createServer } = require('http');

const { Server } = require('socket.io');

const { PORT_WS = 6000 } = process.env;

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

/* eslint-disable no-console */
io.on('connection', () => console.log('New cottection to WS-server'));

(() => {
  try {
    httpServer.listen(PORT_WS, () => console.log(`  -> WS-server:  http://localhost:${PORT_WS}/`));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
