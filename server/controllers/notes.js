const mongoose = require('mongoose');
require('../models/Notes');

const config = require('../config');

const Note = mongoose.model('Note');

module.exports.setUpConnection = () =>
  mongoose.connect(
    config.mongodbUri,
    { useNewUrlParser: true }
  );

module.exports.listNotes = () => {
  return Note.find();
};

module.exports.createNotes = data => {
  const note = new Note({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date()
  });

  return note.save();
};

module.exports.deleteNotes = id => {
  return Note.findById(id).remove();
};
