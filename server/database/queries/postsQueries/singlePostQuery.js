const connection = require('../../config/connection');

const singlePostQuery = (postId) => {
  const sql = {
    text: `SELECT 
      p.id,
      p.title,
      p.content,
      p.type,
      p.category,
      p.image_url,
      p.user_id,
      p.created_at,
      u.username,
      count(c.*) as comments,
      json_agg( u.*) as users,
      COALESCE((select sum(v.type) from votes v where v.post_id = p.id), 0) as votes
      FROM posts p 
      LEFT JOIN comments c ON c.post_id = p.id
      JOIN users u ON p.user_id = u.id 
      WHERE p.id = $1
      GROUP BY p.id, u.username;
  `,
    values: [postId],
  };
  return connection.query(sql);
};

module.exports = singlePostQuery;
