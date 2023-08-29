
const express = require('express');
const router  = express.Router();
const admins = require("../db/queries/index-queries");


router.get('/', (req, res) => {
  res.render('index');
});


router.post('/', (req, res) => {
  const admin = req.body;
  admins.addAdmin(admin)
  .then(admin => {
    if (!admin) {
      return res.send({error: "error"});
    }
    // res.redirect('/poll');
    req.session.adminId = admin.id;
  })
  .catch(e => {
    res.send(e);
  })
});

module.exports = router;
