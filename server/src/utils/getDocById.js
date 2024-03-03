const { doc, getDoc } = require('firebase/firestore');

const HttpError = require('./HttpError');

const getDocById = async (Collection, id) => {
  const docRef = doc(Collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw HttpError(403);
  }
};

module.exports = getDocById;
