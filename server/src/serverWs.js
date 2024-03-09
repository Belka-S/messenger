require('dotenv').config();
const express = require('express');

const { doc, setDoc } = require('firebase/firestore');

const { Elements } = require('./db');

const { PORT_WS = 5000 } = process.env;

const server = express().listen(PORT_WS, () => {
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
