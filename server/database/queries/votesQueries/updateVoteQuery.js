const connection = require('../../config/connection');

const updateVoteQuery = ({ postId, userId, type }) => {
  const sql = {
    text: 'INSERT INTO votes (post_id, user_id, type) values ($1,$2,$3) ON CONFLICT (post_id, user_id) DO UPDATE SET type = $3 RETURNING *',
    values: [postId, userId, type],
  };

  return connection.query(sql);
};

module.exports = updateVoteQuery;
