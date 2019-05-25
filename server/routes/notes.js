const express = require('express');

const notesDb = require('../controllers/notes');

// TODO: consider breaking of connection
let isNotesDbConnected = false;
notesDb
  .setUpConnection()
  .then(res => {
    isNotesDbConnected = true;
    console.log('Notes db connection succeed', res);
    console.log(
      'Notes db connection succeed MONGODB_URI',
      process.env.MONGODB_URI
    );
  })
  .catch(err => {
    isNotesDbConnected = false;
    console.log('Notes db connection error!', err);
  });

const router = new express.Router();

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
