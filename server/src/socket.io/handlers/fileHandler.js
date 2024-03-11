const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { doc, setDoc } = require('firebase/firestore');

const { getDocById } = require('../../utils');
const { storage, Elements } = require('../../db');

const fileHandler = socket => {
  // upload file
  socket.on('uploadFile', async fileObj => {
    const { id, file, name, contentType, owner } = fileObj;
    const fileRef = ref(storage, `${owner}/${name}`);

    const metadata = {
      contentType,
      customMetadata: { id, name, owner },
    };
    try {
      await uploadBytes(fileRef, file, metadata);
      const fileUrl = await getDownloadURL(fileRef);
      // getMetadata(fileRef)
      const msg = await getDocById(Elements, id);
      const elRef = doc(Elements, id);
      setDoc(elRef, { ...msg, fileUrl });

      socket.broadcast.emit('uploadFile', msg);
      socket.emit('uploadFile', msg);
    } catch (err) {
      console.log(err.message);
    }
  });
  // delete file
  // socket.on('deleteFile', msg => {
  //   socket.broadcast.emit('deleteMessage', msg);
  // });
};

module.exports = fileHandler;
