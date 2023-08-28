
const express = require('express');
const router  = express.Router();
const admins = require("../db/queries/admins");

router.post('/', (req, res) => {
  const admin = req.body;
  admins.addAdmin(admin)
  .then(admin => {
    if (!admin) {
      return res.send({error: "error"});
    }

    req.session.adminId = admin.id;
  })
  .catch(e => {
    res.send(e);
  })
});

module.exports = router;
