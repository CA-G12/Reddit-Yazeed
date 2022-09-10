const verifyToken = require('../utils/verifyToken');
const ServerError = require('../errors/serverError');

const checkAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    verifyToken(token).then((decoded) => {
      req.user = decoded;
      res.status(200).json({
        message: 'User is authorized', label: 'Success', status: 200, user: decoded,
      });
    }).catch((err) => {
      res.user = null;
      next(err);
    });
  } else {
    res.user = null;
    next(new ServerError({
      message: 'User is unathuraized',
      label: 'Authorization Error',
      status: 403,
    }));
  }
};

module.exports = checkAuth;
