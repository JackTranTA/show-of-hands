const db = require('../connection');

// const getPollIdByIdentifier = (identifier) => {
//   const queryString = `
//     SELECT id
//     FROM polls
//     WHERE voter_identifier = $1;
//   `;
//   return db.query(queryString, [identifier])
//   .then(data => {
//     console.log(data.rows[0]);
//     return data.rows[0];
//   })
//   .catch(e => {
//     return console.error('query error', e.stack);
//   });
//
// };

const addVoter = (voter) => {
  const queryString = `
    INSERT INTO voters (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;

  return db.query(queryString, [voter.name, voter.email])
  .then(res => {
    console.log(res.rows[0]);
    return res.rows[0];
  })
  .catch(err => {
    return console.error(err.stack);
  });

};

const getPollDetailByIdentifier = (identifier) => {
  const queryString = `
    SELECT admins.name AS creator_name, title, send_result, ARRAY_AGG(option_title) AS option_titles, ARRAY_AGG(option_description) AS option_descriptions
    FROM polls
    JOIN poll_options ON polls.id = poll_id
    JOIN admins ON polls.admin_id = admins.id
    WHERE polls.voter_identifier = $1
    GROUP BY creator_name, title, send_result;
  `;
  return db.query(queryString, [identifier]) // can include poll remaining time - stretch
  .then(res => {
    return res.rows[0];
  })
  .catch(err => {
    console.error(err.stack);
  });
};

module.exports = {addVoter, getPollDetailByIdentifier};
