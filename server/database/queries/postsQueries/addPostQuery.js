const connection = require('../../config/connection');

const addPostQuery = ({
  title, content, type, category, imageUrl, userId,
}) => {
  console.log({
    title, content, type, category, imageUrl, userId,
  });
  const sql = {
    text: `INSERT INTO posts (title, content, type, category, image_url, user_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    values: [title, content, type, category, imageUrl, userId],
  };

  return connection.query(sql);
};

module.exports = addPostQuery;
