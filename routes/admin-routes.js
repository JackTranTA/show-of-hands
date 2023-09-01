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
      //console.log('id', poll_id);
      return adminRoutes.getExpiredTimeById(poll_id);
  })
  .then(time => {
    expired_time = time['expired_at'];
    console.log('expired time', expired_time);
    return adminRoutes.getPollResultsById(poll_id);
  })
  .then(results => {
    result = results;
    //console.log('results', result);
    return adminRoutes.getVoterLinkById(poll_id);
  })
  .then(url => {
    voterUrl = url;
    //console.log('url', url);
    return adminRoutes.getVotesDetailById(poll_id);
  })
  .then(detail => {
    voteDetail = detail;
    console.log('vote detail', voteDetail);
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
    console.log('currentTime', current_time);
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
