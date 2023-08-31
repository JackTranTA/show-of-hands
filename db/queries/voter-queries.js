const db = require('../connection');

const getPollByIdentifier = (identifier) => {
  const queryString =`
    SELECT admins.name AS creator_name, polls.title, send_result, ARRAY_AGG(poll_options.title) AS titles, ARRAY_AGG(poll_options.description) AS descriptions
    FROM polls
    JOIN poll_options ON polls.id = poll_id
    JOIN admins ON polls.admin_id = admins.id
    WHERE polls.voter_identifier = $1
    GROUP BY creator_name, polls.title, send_result;
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

module.exports = { getPollByIdentifier };
