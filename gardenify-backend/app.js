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
