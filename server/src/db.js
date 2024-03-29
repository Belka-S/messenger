const { initializeApp } = require('firebase/app');
const { getFirestore, collection } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

// db
const db = getFirestore();
const Users = collection(db, 'Users');
const Elements = collection(db, 'Elements');

// storage
const storage = getStorage();

module.exports = { db, Users, Elements, storage };
