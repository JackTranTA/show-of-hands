const express = require('express');
const router  = express.Router();
const voterRoutes = require("../db/queries/voter-queries");

router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  let poll_id, poll_title, candidate;
  voterRoutes.getPollByIdentifier(identifier)
  .then(poll => {
      console.log('return id object', poll);
      poll_id = poll.id;
      poll_title = poll.title;
      console.log('id', poll_id);
      console.log('title', poll_title);
      return voterRoutes.getPollCandidates(poll_id);
  })
  .then(candidates => {
    candidate = candidates;
    console.log('candidates object', candidates);
    res.render('voter', {
      title: poll_title,
      candidates: candidate
    });
  })
  .catch(err => {
    res
    .status(500)
    .json({error: err.message});
  });

});

module.exports = router;
