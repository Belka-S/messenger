const express = require('express');
const cors = require('cors');

const { doc, setDoc } = require('firebase/firestore');

const { Elements } = require('./db');

const { PORT_WS = 5000 } = process.env;

const server = express()
  .use(cors({ origin: '*' }))
  .listen(PORT_WS, () => console.log(`  -> Server ws://localhost:${server.address().port}`));

const io = require('socket.io')(server, {
  cors: {
    origins: '*:*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  // add, update element
  socket.on('chatMessage', msg => {
    socket.broadcast.emit('chatMessage', msg);
    const elRef = doc(Elements, msg.id);
    setDoc(elRef, msg);
  });
  // delete element
  socket.on('deleteMessage', msg => {
    socket.broadcast.emit('deleteMessage', msg);
  });
});
