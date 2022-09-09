const jwt = require('jsonwebtoken');
require('env2')('.env');
const ServerError = require('../errors/serverError');

const generateToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
    if (err) {
      reject(new ServerError({
        message: 'Sorry, we failed to return add user right now, please try later',
        label: 'Internal Server Error',
        status: 500,
      }));
    }

    resolve(token);
  });
});

module.exports = generateToken;
