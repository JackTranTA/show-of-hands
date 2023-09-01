const db = require('../connection');

const addPoll = (poll, adminId, currentTime, pollEnd, public, adminUrl, voterUrl) => {
  const queryString = `
    INSERT INTO polls (admin_id, title, description, created_at, expired_at, send_result, admin_identifier, voter_identifier)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  return db.query(queryString, [adminId, poll.title, poll.description, currentTime, pollEnd, public, adminUrl, voterUrl])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.error('query error', err.stack);
    });
};

const addCandidate = (pollId, title, description) => {
  const queryString = `
    INSERT INTO poll_options (poll_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  return db.query(queryString, [pollId, title, description])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.error('query error', err.stack);
    });
};

module.exports = { addPoll, addCandidate };
