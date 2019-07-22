const express = require('express');

const stories = require('./stories');
const user = require('./user');

const router = new express.Router();

// // ***temp*** delay api response
// router.use((req, res, next) => {
//   setTimeout(() => {
//     next();
//   }, 1000);
// });

router.use('/stories', stories);
router.use('/user', user);

module.exports = router;
