const jwt = require('jsonwebtoken');
require('env2')('.env');
const ServerError = require('../errors/serverError');

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      reject(new ServerError({
        message: 'User is unathuraized',
        label: 'Authorization Error',
        status: 400,
      }));
    }

    resolve(decoded);
  });
});

module.exports = verifyToken;
