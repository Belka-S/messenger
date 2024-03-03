const { getDoc } = require('firebase/firestore');

const HttpError = require('./HttpError');

const getDocByRef = async docRef => {
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw HttpError(403);
  }
};

module.exports = getDocByRef;
