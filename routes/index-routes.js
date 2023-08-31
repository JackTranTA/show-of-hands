const express = require('express');
const router  = express.Router();
const IndexRoutes = require("../db/queries/index-queries");

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
  const admin = req.body;
  IndexRoutes.addAdmin(admin)
  .then(admin => {
    req.session.adminId = admin.id;
    return res.redirect('/poll');
  })
  .catch(e => {
    console.log(e);
    res.send(e);
  })
});

module.exports = router;
