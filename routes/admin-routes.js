const express = require('express');
const router  = express.Router();
const adminRoutes = require("../db/queries/admin-queries");


router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  let poll_id, result, voterUrl, visitCount, voteDetail;
  adminRoutes.getPollIdByIdentifier(identifier)
  .then( id => {
      console.log('return id object', id.id);
      poll_id = id.id;
      console.log('id', poll_id);
      return adminRoutes.getPollResultsById(poll_id);
    }
  )
  .then(results => {
    result = results;
    console.log('results', result);
    return adminRoutes.getVoterLinkById(poll_id);
  })
  .then(url => {
    voterUrl = url;
    console.log('url', url);
    return adminRoutes.getVisitCountById(poll_id);
  })
  .then(count => {
    visitCount = count;
    console.log('visitCount', visitCount);
    return adminRoutes.getVotesDetailById(poll_id);
  })
  .then(detail => {
    voteDetail = detail;
    console.log('vote detail', voteDetail);
    res.render('poll-results', {
      results: result,
      url: voterUrl,
      visitCount: visitCount,
    });
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });

})




module.exports = router;
