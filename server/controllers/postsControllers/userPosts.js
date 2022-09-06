const { postsQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');

const userPosts = (req, res, next) => {
  const { username } = req.params;
  postsQueries.userPostsQuery(username)
    .then((result) => {
      if (result.rowCount) {
        res.status(200).send({
          message: `We found ${result.rowCount} posts`,
          result: result.rows,
        });
      } else {
        res.status(200).send({
          message: 'No data found',
          result: {},
        });
      }
    })
    .catch((err) => {
      next(new ServerError({
        message: 'Sorry, we failed to return the provided user posts, please try later',
        label: 'Internal Server Error',
        status: 500,
        errors: err,
      }));
    });
};

module.exports = userPosts;
