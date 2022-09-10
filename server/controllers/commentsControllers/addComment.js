const { commentsQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');

const addComment = (req, res, next) => {
  const {
    content, postId,
  } = req.body;

  const userId = req.user && req.user.id;
  if (!userId) {
    next(new ServerError({
      message: 'User is unathuraized',
      label: 'Authorization Error',
      status: 400,
    }));
  }
  commentsQueries.addCommentQuery({ content, userId, postId })
    .then((result) => {
      if (result.rowCount) {
        res.status(200).send({
          message: 'Comment is added successfully',
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

module.exports = addComment;
