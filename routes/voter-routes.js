const express = require('express');
const router = express.Router();
const votersRoute = require("../db/queries/voter-queries");

router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  let poll_details;

  votersRoute.getPollDetailByIdentifier(identifier)
  .then(detail => {
    poll_details = detail;
    console.log(poll_details);

    res.render('voter', {
      poll_details: poll_details
    });
  })
  .catch(err => {
    res.status(500).json({error: err.message});
  });
});

router.post('/:identifier', (req, res) => {
  const voter = req.body;
  votersRoute.addVoter(voter)
  .then(voter => {
    if (!voter) {
      return res.send({error: 'error'});
    }
    req.session.voterId = voter.id;
  })
  .catch(e => {
    res.send(e);
  });
});


module.exports = router;
