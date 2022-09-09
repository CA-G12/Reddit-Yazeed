const verifyToken = require('../utils/verifyToken');
const ServerError = require('../errors/serverError');

const checkUser = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    verifyToken(token).then((decoded) => {
      res.user = decoded;
      // res.status(200).json({ message: 'User is authorized', label: 'Success' });
      next();
    }).catch(() => {
      res.user = null;
      next();
    });
  } else {
    res.user = null;
    next();
  }
};

module.exports = checkUser;
