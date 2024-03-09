require('dotenv').config();
const express = require('express');
// const cors = require('cors');

const { doc, setDoc } = require('firebase/firestore');

const { Elements } = require('./db');

const { PORT_WS = 5000 } = process.env;

const server = express()
  // .use(cors({ origin: '*' }))
  .listen(PORT_WS, () => {
    console.log(`  -> Server ws://localhost:${server.address().port}`);
  });

const io = require('socket.io')(server, {
  cors: {
    origins: '*:*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  // add element
  socket.on('addMessage', msg => {
    socket.broadcast.emit('addMessage', msg);
    const elRef = doc(Elements, msg.id);
    setDoc(elRef, msg);
  });
  // update element
  socket.on('updateMessage', msg => {
    socket.broadcast.emit('addMessage', msg);
    const elRef = doc(Elements, msg.id);
    setDoc(elRef, msg);
  });
  // delete element
  socket.on('deleteMessage', msg => {
    socket.broadcast.emit('deleteMessage', msg);
  });
  // sign user
  socket.on('joinUser', msg => {
    socket.broadcast.emit('joinUser', msg);
  });
  socket.on('leftUser', msg => {
    socket.broadcast.emit('leftUser', msg);
  });
});

// const { Server } = require('socket.io');

// // add element
// const { doc, setDoc } = require('firebase/firestore');

// const { Elements } = require('./db');

// const { PORT_WS = 5000 } = process.env;

// const httpServer = createServer();
// const io = new Server(httpServer, { cors: { origin: '*' } });

// /* eslint-disable no-console */
// io.on('connection', socket => {
//   // add, update element
//   socket.on('addMessage', msg => {
//     socket.broadcast.emit('addMessage', msg);
//     const elRef = doc(Elements, msg.id);
//     setDoc(elRef, msg);
//   });
//   // delete element
//   socket.on('deleteMessage', msg => {
//     socket.broadcast.emit('deleteMessage', msg);
//   });
// });

// (() => {
//   try {
//     httpServer.listen(PORT_WS, () =>
//       console.log(`  -> Server ws://localhost:${httpServer.address().port}`),
//     );
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// })();
