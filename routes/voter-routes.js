const express = require('express');
const router  = express.Router();
const voterRoutes = require("../db/queries/voter-queries");

router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  const candidates = [];
  let creator_name, poll_title, public, candidate_titles, candidate_descriptions;
  voterRoutes.getPollByIdentifier(identifier)
  .then(poll => {
    console.log('return poll object', poll);
    creator_name = poll.creator_name;
    poll_title = poll.title;
    public = poll.send_result;
    candidate_titles = poll.titles;
    candidate_descriptions = poll.descriptions;
    candidates.push(candidate_titles);
    candidates.push(candidate_descriptions);
    res.render('voter', {
      creator: creator_name,
      title: poll_title,
      public: public,
      candidates: candidates,
    });
  })
  .catch(err => {
    res
    .status(500)
    .json({error: err.message});
  });

});

module.exports = router;
