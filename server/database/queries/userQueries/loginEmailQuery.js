const connection = require('../../config/connection');

const loginEmailQuery = (email, password) => {
  const sql = {
    text: 'SELECT * FROM users WHERE email = $1; AND password = $2',
    values: [email, password],
  };

  return connection.query(sql);
};

module.exports = loginEmailQuery;
