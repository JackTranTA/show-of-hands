const express = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'c225bb06bf3d6151947b7716e7da3916-451410ff-6bff0f3a'});
const router  = express.Router();
const pollRoutes = require("../db/queries/poll-queries");
const { generateRandomString } = require('../scripts/helpers/generateRandomString.js');
const { getCurrentDateAndTime } = require('../scripts/helpers/getCurrentDateAndTime.js');

router.get('/', (req, res) => {
  res.render('poll');
});

router.post('/', (req, res) => {
  let pollEnd;
  const poll = req.body;
  let public;
  if (poll.public === "on") {
    public = "TRUE";
  } else {
    public = "FALSE";
  }
  if (poll.end !== '') {
    pollEnd = poll.end.split('T').join(' ');
  }
  const adminUrl = generateRandomString();
  const voterUrl = generateRandomString();
  pollRoutes.addPoll(poll, req.session.adminId, getCurrentDateAndTime(), pollEnd, public, adminUrl, voterUrl)
    .then(polls => {
      const keys = Object.keys(poll);
      const candidates = keys.filter((key) => key.includes('candidate-'));
      for (let i = 0; i < candidates.length / 2; i++) {
        const candidate = keys.filter((key) => key.includes('-' + i));
        pollRoutes.addCandidate(polls.id, poll[candidate[0]], poll[candidate[1]]);
      }
      res.send('success');

      mg.messages.create('sandbox8deea2e3a5154db1af066f26786a5d00.mailgun.org', {
        from: "Lighthouse Labs <mailgun@sandbox8deea2e3a5154db1af066f26786a5d00.mailgun.org>",
        to: [req.session.adminEmail],
        subject: "Show of hands! Get ready to poll!",
        text: "http://localhost:8080/admin/" + adminUrl
      })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});

module.exports = router;
