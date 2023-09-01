const db = require('../connection');

const getPollIdByIdentifier = (identifier) => {
  const queryString = `
    SELECT id
    FROM polls
    WHERE admin_identifier = $1;
  `;
  return db.query(queryString, [identifier])
  .then(data => {
    return data.rows[0];
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
};

const getVoterLinkById = (id) => {
  const queryString = `
    SELECT voter_identifier
    FROM polls
    WHERE id = $1;
  `
  return db.query(queryString, [id])
  .then(data => {
    return `localhost:8080/voters/${data.rows[0]['voter_identifier']}`;
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
};

const getExpiredTimeById = (id) => {
  const queryString = `
    SELECT expired_at
    FROM polls
    WHERE id = $1;
  `
  return db.query(queryString, [id])
  .then(data => {
    return data.rows[0];
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
};

const getPollResultsById = (id) => {
  const queryString = `
    SELECT title, SUM(score)
    FROM poll_options
           LEFT JOIN poll_selections ON poll_options.id = poll_option_id
    WHERE poll_options.poll_id = $1
    GROUP BY title;
  `;

  return db.query(queryString, [id])
  .then(data => {
    return data.rows;
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
};

const getVotesDetailById = (id) => {
  const queryString = `
    SELECT voters.name                          AS voter_name,
           voters.id                            AS voter_id,
           voters.poll_id,
           comment,
           ARRAY_AGG(poll_options.title) AS selected_options_titles,
           ARRAY_AGG(score)                     AS scores
    FROM poll_selections
           JOIN voters ON poll_selections.voter_id = voters.id
           JOIN poll_options ON poll_selections.poll_option_id = poll_options.id
    WHERE voters.poll_id = $1
    GROUP BY voters.id, voters.poll_id, comment
    ORDER BY voter_id;
  `;
  return db.query(queryString, [id])
  .then(data => {
    return data.rows;
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
};

const endPoll = (currentTime, id) => {
  const queryString = `
    UPDATE polls
    SET expired_at = $1
    WHERE id = $2
    RETURNING *;
  `;

  db.query(queryString, [currentTime, id])
  .then(data => {
    return data.rows;
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
}




module.exports = {getPollIdByIdentifier, getVoterLinkById: getVoterLinkById, getPollResultsById, getVotesDetailById, getExpiredTimeById, endPoll};
