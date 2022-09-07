const connection = require('../../config/connection');

const userCommentsQuery = (username) => {
  const sql = {
    text: `SELECT 
    p.id,
    p.title as post_title,
    p.content,
    p.user_id,
    p.created_at,
    u.username,
    c.content,
    c.user_id, 
    c.post_id
    FROM posts p 
    JOIN users u ON p.user_id = u.id 
    JOIN comments c ON c.post_id = p.id
    WHERE u.username = $1;
  `,
    values: [username],
  };
  return connection.query(sql);
};

module.exports = userCommentsQuery;
