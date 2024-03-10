const { doc, setDoc } = require('firebase/firestore');

const { Elements } = require('../../db');

const elementHandler = socket => {
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
};

module.exports = elementHandler;
