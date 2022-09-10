const { postsQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');

const singlePost = (req, res, next) => {
  const { postid } = req.params;

  postsQueries.singlePostQuery(postid)
    .then((data) => {
      if (data.rowCount) {
        res.status(200).send({
          message: `We found your posts of id "${data.rows[0].id}"`,
          result: data.rows[0],
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
        message: 'Sorry, we failed to return your posts search, please try later',
        label: 'Internal Server Error',
        status: 500,
        errors: err,
      }));
    });
};

module.exports = singlePost;
