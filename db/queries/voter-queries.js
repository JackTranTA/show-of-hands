const db = require('../connection');

const getPollByIdentifier = (identifier) => {
  const queryString = `
    SELECT id, title
    FROM polls
    WHERE voter_identifier = $1;
  `;
  return db.query(queryString, [identifier])
  .then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
}

const getPollCandidates = (pollId) => {
  const queryString = `
    SELECT *
    FROM poll_options
    WHERE poll_id = $1;
  `;
  return db.query(queryString, [pollId])
  .then(data => {
    console.log(data.rows);
    return data.rows;
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
}

module.exports = { getPollByIdentifier, getPollCandidates };
