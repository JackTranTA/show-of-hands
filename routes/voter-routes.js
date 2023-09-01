const express = require('express');
const router  = express.Router();
const voterRoutes = require("../db/queries/voter-queries");
const { getCurrentDateAndTime } = require('../scripts/helpers/getCurrentDateAndTime.js');
let poll_id, candidate_ids, expired_time;
let message = "Your poll selections have been submitted successfully!";

router.get('/', (req, res) => {
  res.render('confirmation', {message: message});
});

router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  const candidates = [];
  let creator_name, poll_title, poll_description, public, titles, descriptions, current_time;
  voterRoutes.getPollByIdentifier(identifier)
  .then(poll => {
    poll_id = poll.id;
    creator_name = poll.creator_name;
    poll_title = poll.title;
    poll_description = poll.description;
    public = poll.send_result;
    console.log(poll.description);
    candidate_ids = poll.candidate_ids;
    titles = poll.titles;
    descriptions = poll.descriptions;
    candidates.push(titles);
    candidates.push(descriptions);
    return voterRoutes.getExpiredTimeById(poll_id);
  })
  .then(time => {
    expired_time = time['expired_at'];
    current_time = getCurrentDateAndTime();
    console.log(expired_time);
    if (new Date(current_time) > new Date(expired_time) && expired_time != null){
      message = "You can no longer participate in this poll because the polling period has ended!"
      return res.redirect('/voter/');
    }
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
  for (const rank of candidate_ranks) {
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
  voterRoutes.getExpiredTimeById(poll_id)
  .then(time => {
    expired_time = time['expired_at'];
    current_time = getCurrentDateAndTime();
    if (new Date(current_time) > new Date(expired_time) && expired_time != null){
      message = "You can no longer participate in this poll because the polling period has ended!"
      return res.redirect('/voter/');
    }
    return voterRoutes.addVoter(poll_id, vote);
  })
  .then(voter => {
    voter_id = voter.id;
    for (let i = 0; i < candidate_ranks.length; i++) {
      voterRoutes.addPollRank(candidate_ids[i], voter_id, score[i]);
    }
    // res.send('success');
    res.redirect('/voter/');
  })
  .catch(e => {
    console.log(e);
    res.send(e);
  })
});


module.exports = router;
