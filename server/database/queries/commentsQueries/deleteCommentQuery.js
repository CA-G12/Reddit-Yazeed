const connection = require('../../config/connection');

const deleteCommentQuery = (id) => {
  const sql = {
    text: 'DELETE FROM comments WHERE id = $1 RETURNING *;',
    values: [id],
  };

  return connection.query(sql);
};

module.exports = deleteCommentQuery;
