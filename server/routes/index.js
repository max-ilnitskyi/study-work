const express = require('express');

const notes = require('./notes');
const user = require('./user');

const router = new express.Router();

// // ***temp*** delay api response
// router.use((req, res, next) => {
//   setTimeout(() => {
//     next();
//   }, 1000);
// });

router.use('/notes', notes);
router.use('/user', user);

module.exports = router;
