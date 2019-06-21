const mongoose = require('mongoose');
const Note = require('../models/Note');

const config = require('../config');

module.exports.notesList = (req, res) => {
  const query = Note.find();

  query.then(data => res.send(data)).catch(err => res.sendStatus(500));
};

module.exports.createNote = (req, res) => {
  const data = req.body;
  const query = Note.create({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date()
  });

  query.then(data => res.sendStatus(200)).catch(err => res.sendStatus(500));
};

module.exports.deleteNote = (req, res) => {
  const query = Note.findByIdAndDelete(req.params.id);

  query.then(data => res.sendStatus(200)).catch(err => res.sendStatus(500));
};
