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

const NoteSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', NoteSchema);
