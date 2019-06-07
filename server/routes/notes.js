const express = require('express');

const notesDb = require('../controllers/notes');
const config = require('../config');

// TODO: consider breaking of connection
let isNotesDbConnected = false;
notesDb
  .setUpConnection()
  .then(res => {
    isNotesDbConnected = true;
    console.log('Notes db connection succeed, config uri: ', config.mongodbUri);
  })
  .catch(err => {
    isNotesDbConnected = false;
    console.log('Notes db connection error: ', err);
  });

const router = new express.Router();

// ***temp*** delay api response
router.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000);
});

// in case db not connected - send 500 status
router.use((req, res, next) => {
  if (isNotesDbConnected) {
    next();
  } else {
    res.sendStatus(500);
  }
});

router.get('/', (req, res) => {
  notesDb
    .listNotes()
    .then(data => res.send(data))
    .catch(err => res.sendStatus(500));
});

router.post('/', (req, res) => {
  notesDb
    .createNotes(req.body)
    .then(data => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

router.delete('/:id', (req, res) => {
  notesDb
    .deleteNotes(req.params.id)
    .then(data => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

// wrong request
router.use((req, res) => {
  res.sendStatus(400);
});

module.exports = router;
