const { updateVoteQuery } = require('../../database/queries/votesQueries');
const ServerError = require('../../errors/serverError');

const updateVote = (req, res, next) => {
  const { postId, type } = req.body;

  const userId = req.user && req.user.id;
  if (!userId) {
    next(new ServerError({
      message: 'User is unathuraized',
      label: 'Authorization Error',
      status: 400,
    }));
  }

  updateVoteQuery({ postId, userId, type })
    .then((result) => {
      console.log(result);
      if (result.rowCount) {
        res.status(200).send({
          message: 'vote is updated successfullyy',
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

module.exports = updateVote;
