const mongoose = require('mongoose');
const Note = require('../models/Notes');

const config = require('../config');

module.exports.listNotes = () => {
  return Note.find({});
};

module.exports.createNotes = data => {
  return Note.create({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date()
  });
};

module.exports.deleteNotes = id => {
  return Note.findByIdAndDelete(id);
};
