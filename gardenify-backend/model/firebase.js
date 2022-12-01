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

// -----Member functions-----------
function calculateDateRightNow() {
  // Compute date and split into DD, MM, YYYY
  const d = new Date();
  // Format the date data to be parsed by fb and return
  const dateFormatted = Timestamp.fromDate(new Date(d));
  return dateFormatted;
}

// ------AUTH FUNCTIONS------

// signup user
module.exports.signUp = async function (email, password) {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      return errorCode;
    });
};

// signin user
module.exports.signIn = async function (email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      // ...
      return user;
    })
    .catch((error) => {
      errorCode = error.code;
      const errorMessage = error.message;
      // ...
      return errorCode;
    });
};
