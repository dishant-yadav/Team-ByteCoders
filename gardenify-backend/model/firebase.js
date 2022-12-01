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

// COLLECTIONS: USERS

// get: plants
module.exports.getPlant = async function (userID = null) {
  try {
    if (userID != null) {
      throw { data: 'no id', success: false };
    } else {
      const docRef = doc(db, USERS_COL, userID);
      const docSnap = await getDoc(docRef);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.getUserDetails = async function (userID = null) {
  try {
    if (userID == null) {
      throw { data: 'empty', success: false };
    } else {
      const docRef = doc(db, USERS_COL, userID);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data) return { data: docSnap.data(), success: true };
      else {
        throw 'no-user-found';
      }
    }
  } catch (error) {
    console.log(error);
    return { data: error, success: false };
  }
};

// create
module.exports.createNewUser = async function (
  userID,
  lat,
  lng,
  name = 'User'
) {
  try {
    // compute date
    const date = calculateDateRightNow();
    // creating a new geopoint to set it to latitudes, and longitudes
    // Compute the GeoHash for a lat/lng point
    const latitude = Number(lat);
    const longitude = Number(lng);
    const hash = geohashForLocation([latitude, longitude]);

    // Adding the hash and the lat/lng to the document to use the hash
    // for queries and the lat/lng for distance comparisons.
    let docData = {
      id: userID,
      name: name,
      accountCreationDate: date,
      geohash: hash,
      latitude: latitude,
      longitude: longitude,
      points: 0,
      plants: [],
    };
    const res = await setDoc(doc(db, USERS_COL, userID), docData);
    // const newData = { id: userID, docData };
    return { data: docData, success: true };
  } catch (error) {
    return { data: error, success: false };
  }
};

// update plants field
module.exports.updatePlantArrayOfUser = async function (userID, plantID) {
  try {
    const docRef = doc(db, USERS_COL, userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      var updatedList = [...docSnap.data().plants, plantID];
      await updateDoc(docRef, { plants: updatedList });
      return { data: plantID, success: true };
    } else {
      throw { data: 'no-such-user', success: false };
    }
  } catch (error) {
    return error;
  }
};

module.exports.increasePoints = async function (userID, point) {
  try {
    const docRef = doc(db, USERS_COL, userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // convert points to number
      const pointNumber = Number(point);
      const updatedPoints = Number(pointNumber + docSnap.data().points);
      await updateDoc(docRef, { points: updatedPoints });
      return { data: { id: userID }, success: true };
    } else {
      throw { data: 'no-such-user', success: false };
    }
  } catch (error) {
    return error;
  }
};
// Get Nearby Users:
module.exports.getNearbyUsers = async (lat, lng, dist = 1) => {
  // Find cities within dist km of [lat, lng]
  const center = [Number(lat), Number(lng)];
  const radiusInM = dist * 1000;

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geohashQueryBounds(center, radiusInM);

  const promises = [];
  for (const b of bounds) {
    const q = query(
      collection(db, USERS_COL),
      orderBy('geohash'),
      startAt(b[0]),
      endAt(b[1])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      promises.push(doc.data());
    });
  }

  var finalResult = [];

  // Collect all the query results together into a single list
  await Promise.all(promises)
    .then((snapshots) => {
      const matchingDocs = [];

      for (const snap of snapshots) {
        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const lat = Number(snap.latitude);
        const lng = Number(snap.longitude);
        const distanceInKm = distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(snap);
        }
      }
      return matchingDocs;
    })
    .then((matchingDocs) => {
      // --operations
      finalResult = matchingDocs;
      // return matchingDocs;
    });
  console.log(finalResult);
  return finalResult;
};
