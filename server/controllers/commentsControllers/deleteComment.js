const { commentsQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');

const deleteComment = (req, res, next) => {
  const { id } = req.body;

  commentsQueries.deleteCommentQuery(id)
    .then((result) => {
      if (result.rowCount) {
        res.status(200).send({
          message: 'Comment is deleted successfully',
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

module.exports = deleteComment;
