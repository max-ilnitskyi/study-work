const express = require('express');

const User = require('../models/User');
const config = require('../config');

const router = new express.Router();

// get user from session
router.get('/', (req, res, next) => {
  if (!req.session.userID) return res.jsonErr('User not logged in');

  User.findById(req.session.userID).exec((err, data) => {
    if (err) return next(err);

    if (!data) return next(new Error('Can not find user by id from session'));

    res.jsonOk({ user: data });
  });
});

// registrate new user
router.post('/registrate', (req, res, next) => {
  if (req.session.userID) return res.jsonErr('You already logged in');

  const newUser = req.body;

  if (!newUser || !newUser.login || !newUser.password)
    return res.jsonErr('Need login and password to registrate');

  User.findOne({ login: newUser.login }).exec((err, data) => {
    if (err) return next(err);

    if (data) return res.jsonErr('User already exist');

    const query = User.create({
      login: newUser.login,
      password: newUser.password
    });

    query
      .then(user => {
        req.session.userID = user._id;
        res.jsonOk({ user });
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

  User.findOne({ login: userToLogin.login }).exec((err, data) => {
    if (err) return next(err);

    if (!data) return res.jsonErr('User with this login do not exist');

    if (data.password !== userToLogin.password)
      return res.jsonErr('Wrong password');

    req.session.userID = data._id;
    res.jsonOk({ user: data });
  });
});

// logout
router.post('/logout', (req, res, next) => {
  req.session.userID = null;

  res.status(200).jsonOk();
});

// wrong request
router.use((req, res) => {
  res.sendStatus(404);
});

module.exports = router;
