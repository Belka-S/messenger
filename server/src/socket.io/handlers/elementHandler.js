const { doc, setDoc, deleteDoc } = require('firebase/firestore');

const { Elements } = require('../../db');

const elementHandler = socket => {
  // get all elements

  // add element
  socket.on('addMessage', (msg, cb) => {
    socket.broadcast.emit('addMessage', msg);
    const elRef = doc(Elements, msg.id);
    setDoc(elRef, msg);
    // eslint-disable-next-line n/no-callback-literal
    cb('ok');
  });
  // update element
  socket.on('updateMessage', (msg, cb) => {
    socket.broadcast.emit('updateMessage', msg);
    const elRef = doc(Elements, msg.id);
    setDoc(elRef, msg);
    // eslint-disable-next-line n/no-callback-literal
    cb('ok');
  });
  // delete element
  socket.on('deleteMessage', (msg, cb) => {
    const elRef = doc(Elements, msg.id);
    deleteDoc(elRef);
    socket.broadcast.emit('deleteMessage', msg);
    // eslint-disable-next-line n/no-callback-literal
    cb('ok');
  });
};

module.exports = elementHandler;
