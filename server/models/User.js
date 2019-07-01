const mongoose = require('mongoose');
const crypto = require('crypto');

// for (let i = 1; i <= 3; i++) {
//   const salt = crypto.randomBytes(16).toString('hex');
//   const fakePass = '12345';
//
//   console.log(`--- cool salt(${i}):`, salt);
//   console.log(
//     `--- cool hash(${i}):`,
//     crypto.pbkdf2Sync(fakePass, salt, 10000, 512, 'sha512').toString('hex')
//   );
// }

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
});

UserSchema.methods.verifyPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UserSchema.methods.filtrateForClient = function() {
  return {
    user: {
      login: this.login
    }
  };
};

module.exports = mongoose.model('User', UserSchema);
