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
    
    console.log("admin", admin);
    // req.session.adminId = admin.id;
    return res.redirect('/poll');
  })
  .catch(e => {
    console.log(e);
    res.send(e);
  })
});

module.exports = router;
