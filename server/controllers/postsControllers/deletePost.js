const { postsQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');

const deletePost = (req, res, next) => {
  const { id } = req.body;

  postsQueries.deletePostQuery(id)
    .then((result) => {
      if (result.rowCount) {
        res.status(200).send({
          message: 'Post is deleted successfully',
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

module.exports = deletePost;
