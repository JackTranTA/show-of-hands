const express = require('express');
const router = express.Router();
const adminRoutes = require("../db/queries/admin-queries");
const { getCurrentDateAndTime } = require('../scripts/helpers/getCurrentDateAndTime.js');

router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  let poll_id, result, voterUrl, voteDetail, expired_time;
  adminRoutes.getPollIdByIdentifier(identifier)
  .then(poll => {
      poll_id = poll.id;
      return adminRoutes.getExpiredTimeById(poll_id);
  })
  .then(time => {
    expired_time = time['expired_at'];
    return adminRoutes.getPollResultsById(poll_id);
  })
  .then(results => {
    result = results;
    return adminRoutes.getVoterLinkById(poll_id);
  })
  .then(url => {
    voterUrl = url;
    return adminRoutes.getVotesDetailById(poll_id);
  })
  .then(detail => {
    voteDetail = detail;
    res.render('poll-results', {
      currentTime: getCurrentDateAndTime(),
      expiredTime: expired_time,
      results: result,
      url: voterUrl,
      voteDetails: voteDetail
    });
  })
  .catch(err => {
    res
    .status(500)
    .json({error: err.message});
  });

});

router.post('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  let poll_id, current_time;
  adminRoutes.getPollIdByIdentifier(identifier)
  .then(poll => {
    poll_id = poll.id;
    current_time = getCurrentDateAndTime();
    return adminRoutes.endPoll(current_time, poll_id);
  })
  .then(data => {
    res.send('success');
  })
  .catch(err => {
    res
    .status(500)
    .json({error: err.message});
  });
})


module.exports = router;
