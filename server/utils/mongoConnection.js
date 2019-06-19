const mongoose = require('mongoose');

// initually not connected and connection not started
let isConnected = false;
let connectionStarted = false;

const startConnection = mongodbUri => {
  // startConnection can be used only once
  if (connectionStarted) return console.log('Must be only one DB connection');
  connectionStarted = true;

  // set callbacks on connection events
  mongoose.connection
    .on('connected', () => {
      isConnected = true;
      console.log('DB connection succeed, uri: ', mongodbUri);
    })
    .on('error', err => {
      isConnected = false;
      console.log('DB connection error: ', err);
    })
    .on('disconnected', () => {
      isConnected = false;
      console.log('DB disconnected, trying to connect again...');
      connect(); // if disconnected try to connect again
    });

  // connect to MongoDB
  connect();

  // define function to use in different places
  function connect() {
    mongoose.connect(
      mongodbUri,
      { useNewUrlParser: true }
    );
  }
};

// middleware to check connection to DB, sends status 500 if not connected
const checkConnection = (req, res, next) => {
  if (isConnected) {
    next();
  } else {
    res.sendStatus(500);
  }
};

module.exports = { startConnection, checkConnection };
