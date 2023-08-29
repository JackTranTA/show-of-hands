const db = require('../connection');

const addPoll = (poll) => {
  const queryString = `
    INSERT INTO polls (title, description, created_at, expired_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  return db.query(queryString, [admin.email, admin.name])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => {
    return console.error('query error', err.stack);
  });
};

module.exports = {addAdmin};
