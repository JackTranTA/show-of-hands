const db = require('../connection');

const getPollIdByIdentifier = (identifier) => {
  const queryString = `
    SELECT id
    FROM polls
    WHERE admin_identifier = $1;
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

const getVoterLinkById = (id) => {
  const queryString = `
    SELECT voter_identifier
    FROM polls
    WHERE id = $1;
  `
  return db.query(queryString, [id])
  .then(data => {
    console.log(data.rows[0]); //hard coded voter link
    return `localhost:8080/voters/${data.rows[0]['voter_identifier']}`;
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });

}
const getPollResultsById = (id) => {
  const queryString = `
    SELECT option_title, SUM(score)
    FROM poll_selections
           JOIN poll_options ON poll_option_id = poll_options.id
    WHERE poll_selections.poll_id = $1
    GROUP BY option_title;
  `;

  return db.query(queryString, [id])
  .then(data => {
    return data.rows;
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
};

const getVisitCountById = (id) => {
  const queryString = `
    SELECT visit_count
    FROM polls
    WHERE id = $1;
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
    SELECT voter_id,
           ARRAY_AGG(poll_option_id) AS selected_options,
           ARRAY_AGG(score)          AS scores
    FROM poll_selections
    WHERE poll_id = $1
    GROUP BY voter_id
    ORDER BY voter_id;
  `;
  return db.query(queryString, [id])
  .then(data => {
    return data.rows;
  })
  .catch(e => {
    return console.error('query error', e.stack);
  });
}



module.exports = {getPollIdByIdentifier, getVoterLinkById: getVoterLinkById, getVisitCountById, getPollResultsById, getVotesDetailById};
