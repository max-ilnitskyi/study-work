const express = require('express');

const notesDb = require('../controllers/notes');
const config = require('../config');

const router = new express.Router();

// // ***temp*** delay api response
// router.use((req, res, next) => {
//   setTimeout(() => {
//     next();
//   }, 1000);
// });

// send all notes
router.get('/', (req, res) => {
  notesDb
    .listNotes()
    .then(data => res.send(data))
    .catch(err => res.sendStatus(500));
});

// post new note
router.post('/', (req, res) => {
  notesDb
    .createNotes(req.body)
    .then(data => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

// delete note by id
router.delete('/:id', (req, res) => {
  notesDb
    .deleteNotes(req.params.id)
    .then(data => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

// wrong request
router.use((req, res) => {
  res.sendStatus(404);
});

module.exports = router;
