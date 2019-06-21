const express = require('express');

// const notesControllers = require('../controllers/notesControllers');
const Note = require('../models/Note');
const config = require('../config');

const router = new express.Router();

// send all notes
router.get('/', (req, res) => {
  const query = Note.find();

  query.then(data => res.send(data)).catch(err => res.sendStatus(500));
});

// post new note
router.post('/', (req, res) => {
  const data = req.body;
  const query = Note.create({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date()
  });

  query.then(data => res.sendStatus(200)).catch(err => res.sendStatus(500));
});

// delete note by id
router.delete('/:id', (req, res) => {
  const query = Note.findByIdAndDelete(req.params.id);

  query.then(data => res.sendStatus(200)).catch(err => res.sendStatus(500));
});

// wrong request
router.use((req, res) => {
  res.sendStatus(404);
});

module.exports = router;
