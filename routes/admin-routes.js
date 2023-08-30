const express = require('express');
const router = express.Router();
const adminsRoute = require("../db/queries/admin-queries");


router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  let poll_id, result, voterUrl, voteDetail;
  adminsRoute.getPollIdByIdentifier(identifier)
  .then(id => {
      console.log('return id object', id.id);
      poll_id = id.id;
      console.log('id', poll_id);
      return adminsRoute.getPollResultsById(poll_id);
    }
  )
  .then(results => {
    result = results;
    console.log('results', result);
    return adminsRoute.getVoterLinkById(poll_id);
  })
  .then(url => {
    voterUrl = url;
    console.log('url', url);
    return adminsRoute.getVotesDetailById(poll_id);
  })
  .then(detail => {
    voteDetail = detail;
    console.log('vote detail', voteDetail);
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
