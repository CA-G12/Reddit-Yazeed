const connection = require('../../config/connection');

const loginUsernameQuery = (username, password) => {
  const sql = {
    text: 'SELECT * FROM users WHERE username = $1; AND password = $2',
    values: [username, password],
  };

  return connection.query(sql);
};

module.exports = loginUsernameQuery;
