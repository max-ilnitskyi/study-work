const express = require('express');

const notes = require('./notes');

const router = new express.Router();

// // ***temp*** delay api response
// router.use((req, res, next) => {
//   setTimeout(() => {
//     next();
//   }, 1000);
// });

router.use('/notes', notes);

module.exports = router;
