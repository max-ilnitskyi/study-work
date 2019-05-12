const mongoose = require('mongoose');
require('../models/Notes');

const config = require('../../etc/config.json');

const Note = mongoose.model('Note');

module.exports.setUpConnection = () => {
  mongoose.connect(
    `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
  );
};

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
