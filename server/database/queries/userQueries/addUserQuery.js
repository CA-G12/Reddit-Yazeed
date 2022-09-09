const connection = require('../../config/connection');

const addUserQuery = ({
  username, email, hashedPassword, avatarUrl,
}) => {
  const sql = {
    text: `INSERT INTO users (username, email, password, avatar_url) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
    values: [username, email, hashedPassword, avatarUrl],
  };

  return connection.query(sql);
};

module.exports = addUserQuery;
