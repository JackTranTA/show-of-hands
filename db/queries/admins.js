const db = require('../connection');

const addAdmin = (admin) => {
  const queryString = `
    INSERT INTO users (email, name, is_admin)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  return db.query(queryString, [admin.email, admin.name, true])
  .then(res => {
    console.log(res.rows[0]);
    return res.rows[0];
  })
  .catch(err => {
    return console.error('query error', err.stack);
  });
};

module.exports = {addAdmin};
