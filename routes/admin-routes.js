const express = require('express');
const router = express.Router();
const adminRoutes = require("../db/queries/admin-queries");

router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  let poll_id, result, voterUrl, voteDetail;
  adminRoutes.getPollIdByIdentifier(identifier)
  .then(poll => {
      //console.log('return poll object', poll.id);
      poll_id = poll.id;
      //console.log('id', poll_id);
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
    //console.log('vote detail', voteDetail);
    res.render('poll-results', {
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


module.exports = router;
