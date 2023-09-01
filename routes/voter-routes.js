const express = require('express');
const router  = express.Router();
const voterRoutes = require("../db/queries/voter-queries");
let poll_id, candidate_ids;

router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  const candidates = [];
  let creator_name, poll_title, poll_description, public, titles, descriptions;
  voterRoutes.getPollByIdentifier(identifier)
  .then(poll => {
    poll_id = poll.id;
    creator_name = poll.creator_name;
    poll_title = poll.title;
    poll_description = poll.description;
    public = poll.send_result;

    candidate_ids = poll.candidate_ids;
    titles = poll.titles;
    descriptions = poll.descriptions;
    candidates.push(titles);
    candidates.push(descriptions);

    res.render('voter', {
      creator: creator_name,
      title: poll_title,
      description: poll_description,
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

router.post('/', (req, res) => {
  const vote = req.body;
  const score = [];

  console.log('return vote', vote);
  let voter_id, candidate_ranks;
  let n = 1;
  candidate_ranks = vote.rank;
  console.log(candidate_ranks);
  for (rank of candidate_ranks) {
    if (rank != 0) {
      n++;
    }
  }
  console.log('n:', n);
  for (rank of candidate_ranks) {
    if (rank == 0) {
      score.push('0');
    } else {
      score.push('' + (n - rank))
    }
  }
  console.log(score);
  voterRoutes.addVoter(poll_id, vote)
  .then(voter => {
    voter_id = voter.id;
    for (let i = 0; i < candidate_ranks.length; i++) {
      voterRoutes.addPollRank(candidate_ids[i], voter_id, score[i]);
    }
    res.redirect('/');
  })
  .catch(e => {
    console.log(e);
    res.send(e);
  })
});

module.exports = router;
