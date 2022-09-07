const connection = require('../../config/connection');

const postCommentsQuery = (postId) => {
  const sql = {
    text: `SELECT 
      p.id as post_id,
      p.title as post_title,
      p.content,
      p.type,
      p.category,
      p.image_url,
      p.user_id as post_author_id,
      p.created_at,
      u.username,
      c.id as comment_id,
      c.content,
      c.post_id,
      c.user_id as comment_author_id
      FROM comments c 
      JOIN posts p ON c.post_id = p.id
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1;
  `,
    values: [postId],
  };

  return connection.query(sql);
};

module.exports = postCommentsQuery;
