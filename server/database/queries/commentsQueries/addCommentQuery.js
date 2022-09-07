const connection = require('../../config/connection');

const addCommentQuery = ({
  content, postId, userId,
}) => {
  const sql = {
    text: `INSERT INTO comments (content, post_id, user_id)
    VALUES ($1, $2, $3) RETURNING *;`,
    values: [content, postId, userId],
  };

  return connection.query(sql);
};

module.exports = addCommentQuery;
