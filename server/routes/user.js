const express = require('express');
const passport = require('passport');

const User = require('../models/User');
const config = require('../config');

const router = new express.Router();

// // get user from session
// router.get('/', (req, res, next) => {
//   if (!req.session.userID) return res.jsonErr('User not logged in');
//
//   User.findById(req.session.userID).exec((err, data) => {
//     if (err) return next(err);
//
//     if (!data) return next(new Error('Can not find user by id from session'));
//
//     res.jsonOk({ user: data });
//   });
// });

// get user from session ***2***
router.get('/', (req, res, next) => {
  if (!req.user) return res.jsonErr('User not logged in');

  res.jsonOk({ user: User.filtrateForClient(req.user) });
});

// // registrate new user
// router.post('/registrate', (req, res, next) => {
//   if (req.session.userID) return res.jsonErr('You already logged in');
//
//   const reqUserData = req.body;
//
//   if (!reqUserData || !reqUserData.login || !reqUserData.password)
//     return res.jsonErr('Need login and password to registrate');
//
//   User.findOne({ login: reqUserData.login }).exec((err, data) => {
//     if (err) return next(err);
//
//     if (data) return res.jsonErr('User already exist');
//
//     const newUser = new User();
//     newUser.login = reqUserData.login;
//     newUser.setPassword(reqUserData.password);
//
//     newUser
//       .save()
//       .then(user => {
//         // req.session.userID = user._id;
//         res.jsonOk({ user });
//       })
//       .catch(err => next(err));
//   });
// });

// registrate new user ***2***
router.post('/registrate', (req, res, next) => {
  if (req.user) return res.jsonErr('You already logged in');

  const reqUserData = req.body;

  if (!reqUserData || !reqUserData.login || !reqUserData.password)
    return res.jsonErr('Need login and password to registrate');

  User.findOne({ login: reqUserData.login }).exec((err, data) => {
    if (err) return next(err);

    if (data) return res.jsonErr('User already exist');

    const newUser = new User();
    newUser.login = reqUserData.login;
    newUser.setPassword(reqUserData.password);

    newUser
      .save()
      .then(user => {
        // req.session.userID = user._id;
        res.jsonOk({ user: User.filtrateForClient(user) });
      })
      .catch(err => next(err));
  });
});

// // login
// router.post('/login', (req, res, next) => {
//   if (req.session.userID) {
//     return res.jsonErr('You already logged in');
//   }
//
//   const userToLogin = req.body;
//
//   if (!userToLogin || !userToLogin.login || !userToLogin.password)
//     return res.jsonErr('Need login and password to login');
//
//   User.findOne({ login: userToLogin.login }).exec((err, user) => {
//     if (err) return next(err);
//
//     if (!user) return res.jsonErr('User with this login do not exist');
//
//     if (user.password !== userToLogin.password)
//       return res.jsonErr('Wrong password');
//
//     req.session.userID = data._id;
//     res.jsonOk({ user: data });
//   });
// });

// // login ***2***
// router.post('/login', (req, res, next) => {
//   const userToLogin = req.body;
//
//   if (!userToLogin || !userToLogin.login || !userToLogin.password)
//     return res.jsonErr('Need login and password to login');
//
//   passport.authenticate('local', {}, function(err, user, info) {
//     if (err) return next(err);
//
//     if (!user) return res.jsonErr(info.message);
//
//     req.logIn(user);
//     res.jsonOk({ user });
//
//     return next;
//   })(req, res, next);
// });

// login ***3***
router.post(
  '/login',
  //// TODO:  разобраться, почему с колллбеком не работает
  // TODO: почему-то при коллбеке аутентификация не работает до конца,
  // исправить это или отказаться от passport
  passport.authenticate('local'),
  (req, res, next) => {
    // const userToLogin = req.body;

    // if (!userToLogin || !userToLogin.login || !userToLogin.password)
    //   return res.jsonErr('Need login and password to login');

    console.log('---login req user: ', req.user);
    if (!req.user) return res.jsonErr('Not logged in...');
    res.jsonOk({ user: User.filtrateForClient(req.user) });
  }
);

// logout
router.post('/logout', (req, res, next) => {
  req.session.userID = null;

  res.status(200).jsonOk();
});

// logout ***2***
router.post('/logout', (req, res, next) => {
  req.logout();

  res.status(200).jsonOk();
});

// wrong request
router.use((req, res) => {
  res.sendStatus(404);
});

module.exports = router;
