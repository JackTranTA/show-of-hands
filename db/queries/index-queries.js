const db = require('../connection');

const addAdmin = (admin) => {
  const queryString = `
    INSERT INTO admins (email, name)
    VALUES ($1, $2)
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
