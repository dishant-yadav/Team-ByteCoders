// ------IMPORTS-----------

// Express App
const express = require('express');
const app = express();

// to parse path
const path = require('path');

// To parse request body
const { urlencoded, json } = require('body-parser');

// Setup Firebase
const {
  signUp,
  signIn,
  createNewUser,
  getUserDetails,
  getNearbyPlants,
  createNewPlant,
  getPlantDetails,
  updatePlantCurrentStatus,
  updatePlantImage,
  updatePlantIDisease,
  increasePoints,
  updatePlantArrayOfUser,
  getNearbyUsers,
} = require('./models/firebase');

// dotenv
require('dotenv').config();

// admin ui for socket.io
// const { instrument } = require('@socket.io/admin-ui');

// -----------SERVER------------------

// Application PORT
var PORT = process.env.PORT || 3399;

// server init
const server = app.listen(PORT, () => {
  console.log('App listening at port', PORT);
});

// -----------SOCKET------------------
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

// console.log(;
// const customIO = io.of('/sockets/');
io.on('connection', (socket) => {
  // socket listeners

  socket.on('join-room', (id) => {
    socket.join(id);
  });
  // socket emmiters
  // --------MIDDLEWARES----------------
  
  // for parsing application/json
  app.use(json());
  // // for parsing application/x-www-form-urlencoded
  app.use(urlencoded({ extended: false }));

  // create statics middlewares
  app.use(express.static('./views'));

  // ----------REQUESTS-----------------
  // signUp
  app.post('/signup', (req, res) => {
    const { name, mail, pass, latitude, longitude } = req.body;

    const lat = Number(latitude);
    const lng = Number(longitude);
    if (
      lat == null ||
      lng == null ||
      lat > 90 ||
      lng > 180 ||
      lat < -90 ||
      lng < -180
    ) {
      res.json({ data: 'invalid-coordinates', success: false });
    } else {
      let uid;
      signUp(mail, pass)
        .then((data) => {
          if (data.uid) {
            uid = data.uid;
          } else {
            throw data;
          }
        })
        .then(async () => {
          createNewUser(uid, lat, lng, name)
            .then((data) => {
              // Joins room: UserID  which will listen to updates on plants
              socket.join(uid);
              res.json(data);
            })
            .catch((err) => {
              console.log(err);
              // TODO: Call firestore db by id and delete it.
              res.json({ err, success: false });
            });
        })
        .catch((err) => {
          // console.log('ERROR IN SIGNUP: ', err);
          res.json({ data: err, success: false });
        });
    }
  });

  // signIn
  app.post('/signin', (req, res) => {
    const { mail, pass } = req.body;
    signIn(mail, pass)
      .then((data) => {
        if (data.uid) {
          // Joins room: UserID which will listen to updates on plants
          socket.join(data.uid);
          res.json({ data: data.uid, success: true });
        } else {
          res.json({ data: data, success: false });
        }
      })
      .catch((err) => {
        console.log('FATAL ERROR: ', err);
        res.json({ data: err, success: false });
      });
  });
