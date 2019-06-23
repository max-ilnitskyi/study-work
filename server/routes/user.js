const express = require('express');

// const notesControllers = require('../controllers/notesControllers');
const User = require('../models/User');
const config = require('../config');

const router = new express.Router();

// registrate new user
router.post('/registrate', (req, res) => {
  const newUser = req.body;
  console.log('----', newUser);

  if (!newUser || !newUser.login || !newUser.password) {
    return res.status(400).send('Need login and password to registrate');
  }

  User.findOne({ login: newUser.login }).exec((err, data) => {
    if (data) return res.status(400).send('User already exist');

    const query = User.create({
      login: newUser.login,
      password: newUser.password
    });

    query.then(data => res.sendStatus(200)).catch(err => res.sendStatus(500));
  });
});

// login
router.post('/login', (req, res) => {
  const userToLogin = req.body;

  if (!userToLogin || !userToLogin.login || !userToLogin.password) {
    return res.status(400).send('Need login and password to login');
  }

  User.findOne({ login: userToLogin.login }).exec((err, data) => {
    if (err) return res.status(400).send('User not exist');

    if (data.password !== userToLogin.password)
      return res.status(400).send('Wrong Password');

    req.session.userID = data._id;
    // res.json(data);
    res.status(200).send('Login and password correct! Please, fetch data.');
  });
});

// logout
router.post('/logout', (req, res) => {
  if (!req.session.userID) return res.status(400).send('You are not logged');

  req.session.userID = null;
  res.status(200).send('You successfylly logout! Please, fetch data.');
});

// get user from session
router.get('/', (req, res) => {
  if (!req.session.userID) return res.status(400).send('Not logged');

  User.findById(req.session.userID).exec((err, data) => {
    if (err)
      return res.status(500).send('Can not access user by id in session');

    res.json({ login: data.login, _id: data._id });
  });
});

// wrong request
router.use((req, res) => {
  res.sendStatus(404);
});

module.exports = router;
