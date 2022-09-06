const { postsQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');
const { validatePost } = require('../../validation');

const addPost = (req, res, next) => {
  const {
    title, content, type, category, imageUrl, userId,
  } = req.body;

  validatePost(req.body)
    .then(() => postsQueries.addPostQuery({
      title, content, type, category, imageUrl, userId,
    }))
    .then((result) => {
      if (result.rowCount) {
        res.status(200).send({
          message: 'Post is added successfully',
          result: result.rows[0],
        });
      }
    })
    .catch((err) => {
      if (!err.messages) {
        next(new ServerError({
          message: err.detail,
          label: 'Server/Database Error',
          status: 422,
        }));
      } else {
        next(err);
      }
    });
};

module.exports = addPost;
