// require('dotenv').config();
// const express = require('express');
// const socket = require('socket.io');

// const onConnection = require('./socket.io/onConnection.js');

// const { PORT_WS = 5000 } = process.env;

// const server = express().listen(PORT_WS, () => {
//   // eslint-disable-next-line no-console
//   console.log(`  -> Server ws://localhost:${server.address().port}`);
// });

// const io = socket(server, {
//   cors: {
//     origins: '*:*',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', socket => {
//   onConnection(socket);
// });
