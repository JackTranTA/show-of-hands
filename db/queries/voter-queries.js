const db = require('../connection');

const getPollByIdentifier = (identifier) => {
  const queryString =`
    SELECT polls.id, admins.name AS creator_name, polls.title, polls.description, send_result, ARRAY_AGG(poll_options.id) AS candidate_ids, ARRAY_AGG(poll_options.title) AS titles, ARRAY_AGG(poll_options.description) AS descriptions
    FROM polls
    JOIN poll_options ON polls.id = poll_id
    JOIN admins ON polls.admin_id = admins.id
    WHERE polls.voter_identifier = $1
    GROUP BY polls.id, creator_name, polls.title, polls.description, send_result;
  `;
  return db.query(queryString, [identifier])
  .then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
};

const addVoter = (pollId, voter) => {
  const queryString = `
    INSERT INTO voters (poll_id, name, email, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  return db.query(queryString, [pollId, voter.name, voter.email, voter.comment])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => {
    return console.error('query error', err.stack);
  });
};

const addPollRank = (candidateId, voterId, score) => {
  const queryString = `
    INSERT INTO poll_selections (poll_option_id, voter_id, score)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  return db.query(queryString, [candidateId, voterId, score])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => {
    return console.error('query error', err.stack);
  });
};

module.exports = { getPollByIdentifier, addVoter, addPollRank };
