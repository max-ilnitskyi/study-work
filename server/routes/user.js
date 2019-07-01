const express = require('express');
const passport = require('passport');

const User = require('../models/User');
const config = require('../config');

const router = new express.Router();

// Get user from session
router.get('/', (req, res, next) => {
  if (!req.session.userID) return res.jsonErr('User not logged in');

  User.findById(req.session.userID).exec((err, user) => {
    if (err) return next(err);

    if (!user) return next(new Error('Can not find user by id from session'));

    res.jsonOk(user.filtrateForClient());
  });
});

// Registrate new user
router.post('/registrate', (req, res, next) => {
  if (req.session.userID) return res.jsonErr('You already logged in');

  const userToRegistrate = req.body;

  if (
    !userToRegistrate ||
    !userToRegistrate.login ||
    !userToRegistrate.password
  )
    return res.jsonErr('Need login and password to registrate');

  User.findOne({ login: userToRegistrate.login }).exec((err, data) => {
    if (err) return next(err);

    if (data) return res.jsonErr('User already exist');

    const newUser = new User();
    newUser.login = userToRegistrate.login;
    newUser.setPassword(userToRegistrate.password);

    newUser
      .save()
      .then(user => {
        req.session.userID = user._id;
        res.jsonOk(user.filtrateForClient());
      })
      .catch(err => next(err));
  });
});

// login
router.post('/login', (req, res, next) => {
  if (req.session.userID) {
    return res.jsonErr('You already logged in');
  }

  const userToLogin = req.body;

  if (!userToLogin || !userToLogin.login || !userToLogin.password)
    return res.jsonErr('Need login and password to login');

  User.findOne({ login: userToLogin.login }).exec((err, user) => {
    if (err) return next(err);

    if (!user) return res.jsonErr('User with this login do not exist');

    if (!user.verifyPassword(userToLogin.password))
      return res.jsonErr('Wrong password');

    req.session.userID = user._id;
    res.jsonOk(user.filtrateForClient());
  });
});

// logout
router.post('/logout', (req, res, next) => {
  req.session.userID = null;

  res.jsonOk();
});

// wrong request
router.use((req, res) => {
  res.sendStatus(404);
});

module.exports = router;
