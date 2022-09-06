const connection = require('../../config/connection');

const searchPosts = (title) => {
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
    count(c.post_id) as comments,
    COALESCE((select sum(v.type) from votes v where v.post_id = p.id), 0) as votes
    FROM posts p 
    JOIN users u ON p.user_id = u.id 
    LEFT JOIN comments c ON c.post_id = p.id
    WHERE p.title like $1
    GROUP BY p.id, u.username;
  `,
    values: [`%${title}%`],
  };
  return connection.query(sql);
};

module.exports = searchPosts;
