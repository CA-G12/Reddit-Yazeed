const { postsQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');
const { validatePost } = require('../../validation');

const addPost = (req, res, next) => {
  const {
    title, content, type, category, imageUrl,
  } = req.body;

  const userId = req.user.id;
  if (!userId) {
    next(new ServerError({
      message: 'User is unathuraized',
      label: 'Authorization Error',
      status: 400,
    }));
  }
  validatePost({
    title, content, type, category, imageUrl, userId,
  })
    .then(() => postsQueries.addPostQuery({
      title, content, type, category, imageUrl, userId,
    }))
    .then((result) => {
      if (result.rowCount) {
        res.status(200).send({
          message: 'Post is added successfully',
          result: result.rows[0],
          user: req.user,
          isLoggedIn: true,
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
