const { initializeApp } = require('firebase/app');
const { getFirestore, collection } = require('firebase/firestore');

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();

const Users = collection(db, 'Users');
const Elements = collection(db, 'Elements');

module.exports = { db, Users, Elements };
