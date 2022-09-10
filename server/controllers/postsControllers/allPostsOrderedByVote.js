const { postsQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');

const allPostsOrderedByVote = (req, res, next) => {
  postsQueries.allPostsOrderedByVoteQuery()
    .then((result) => {
      if (result.rowCount) {
        res.status(200).send({
          message: `We found ${result.rowCount} posts`,
          result: result.rows,
          user: req.user,
          isLoggedIn: true,
        });
      } else {
        res.status(200).send({
          message: 'No data found',
          result: {},
          user: req.user,
          isLoggedIn: true,
        });
      }
    })
    .catch((err) => {
      next(new ServerError({
        message: 'Sorry, we failed to return posts, please try later',
        label: 'Internal Server Error',
        status: 500,
        errors: err,
      }));
    });
};

module.exports = allPostsOrderedByVote;
