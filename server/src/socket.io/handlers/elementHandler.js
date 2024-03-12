const { doc, getDocs, setDoc, deleteDoc } = require('firebase/firestore');
const { ref, deleteObject } = require('firebase/storage');

const { storage, Elements } = require('../../db');

const elementHandler = socket => {
  // fetch all elements
  socket.on('fetchMessages', async (msg, cb) => {
    socket.broadcast.emit('fetchMessages', msg);
    const docSnap = await getDocs(Elements);
    const docs = docSnap.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    // eslint-disable-next-line n/no-callback-literal
    cb({ docs });
  });

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
    if (msg.filePath) {
      const fileRef = ref(storage, msg.filePath);
      deleteObject(fileRef).then(err => console.log(err));
    }
    // eslint-disable-next-line n/no-callback-literal
    cb('ok');
  });
};

module.exports = elementHandler;
