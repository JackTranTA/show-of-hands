const db = require('../connection');

const getPollIdByIdentifier = (identifier) => {
  const queryString = `
    SELECT poll_id FROM poll_links
    WHERE identifier = $1;
  `;
  return db.query(queryString, [id])
  .then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
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



module.exports = {getPollIdByIdentifier, getVisitCountById, getPollResultsById};
