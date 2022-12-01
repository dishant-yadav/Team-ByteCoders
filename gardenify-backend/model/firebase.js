// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require('firebase/auth');

const {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
  getDoc,
  collection,
  orderBy,
  startAt,
  endAt,
  query,
  getDocs,
  addDoc,
} = require('firebase/firestore');

// to geohash for queries
const {
  geohashForLocation,
  geohashQueryBounds,
  distanceBetween,
} = require('geofire-common');

// variables(stores static values to prevent issues if renamed)
const { USERS_COL, PLANTS_COL } = require('./vars');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCBROFj2bMG8Al9Q8C6rFZ07mEvs7DdMfc',
  authDomain: 'gardenify-backend.firebaseapp.com',
  projectId: 'gardenify-backend',
  storageBucket: 'gardenify-backend.appspot.com',
  messagingSenderId: '489389278087',
  appId: '1:489389278087:web:6f285263006c6d2ace0922',
  measurementId: 'G-PZQY5K4MF5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialise Auth
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
