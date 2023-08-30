const express = require('express');
const router  = express.Router();
const generateRandomString = require('../public/scripts/helpers/generateRandomString.js');

router.get('/', (req, res) => {
  res.render('poll');
});

module.exports = router;
