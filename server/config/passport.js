const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Load User model
const User = require('../models/User');

const local = new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password'
  },
  function(login, password, done) {
    User.findOne({ login }, function(err, user) {
      if (err) return done(err);
      if (!user)
        return done(null, false, {
          message: 'User with this login do not exist'
        });
      if (!user.verifyPassword(password))
        return done(null, false, { message: 'Wrong password' });

      return done(null, user);
    });
  }
);

module.exports = function(passport) {
  passport.use(local);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
