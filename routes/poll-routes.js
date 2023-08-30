const express = require('express');
const router  = express.Router();
const polls = require("../db/queries/poll-queries");
const { generateRandomString } = require('../scripts/helpers/generateRandomString.js');
const { getCurrentDateAndTime } = require('../scripts/helpers/getCurrentDateAndTime.js');

router.get('/', (req, res) => {
  res.render('poll');
});

router.post('/', (req, res) => {
  const poll = req.body;
  let public;
  if(poll.public === "on") {
    public = "TRUE";
  } else {
    public = "FALSE";
  }
  const pollEnd = poll.end.split('T').join(' ').concat(':00');
  console.log("end", pollEnd);
  console.log("start", getCurrentDateAndTime());
  polls.addPoll(poll, req.session.adminId, getCurrentDateAndTime(), pollEnd, public, generateRandomString(), generateRandomString())
  .then(response => {
    const keys = Object.keys(poll);
    const candidates = keys.filter((key) => key.includes('candidate-'));
    for (let i = 0; i < candidates.length/2; i++) {
      const candidate = keys.filter((key) => key.includes('-' + i));
      console.log("candidate", poll[candidate[0]], poll[candidate[0]]);
      polls.addCandidate(response.id, poll[candidate[0]], poll[candidate[1]]);
    }
  })
  .catch(e => {
    console.log(e);
    res.send(e);
  })
});

module.exports = router;
