const { getDocs } = require('firebase/firestore');

const HttpError = require('./HttpError');

const getDocsList = async query => {
  const docSnap = await getDocs(query);
  const docs = docSnap.docs.map(doc => {
    return { id: doc.id, ...doc.data() };
  });

  if (docs) {
    return docs;
  } else {
    throw HttpError(403);
  }
};

module.exports = getDocsList;
