const verifyToken = require('../utils/verifyToken');

const checkUser = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    verifyToken(token).then((decoded) => {
      req.user = decoded;
      next();
    }).catch(() => {
      req.user = null;
      next();
    });
  } else {
    req.user = null;
    next();
  }
};

module.exports = checkUser;
