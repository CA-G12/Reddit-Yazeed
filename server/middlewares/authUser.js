const verifyToken = require('../utils/verifyToken');
const ServerError = require('../errors/serverError');

const authUser = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    verifyToken(token).then((decoded) => {
      res.user = decoded;
      next();
    }).catch((err) => next(err));
  } else {
    next(new ServerError({
      message: 'User is unathuraized',
      label: 'Authorization Error',
      status: 400,
    }));
  }
};

module.exports = authUser;
