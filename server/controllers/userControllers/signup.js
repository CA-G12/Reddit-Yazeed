const bcrypt = require('bcryptjs');
require('env2')('.env');
const { userQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');
const { signupValidate } = require('../../validation');
const generateToken = require('../../utils/generateToken');

const signup = (req, res, next) => {
  const {
    username, email, password, avatarUrl,
  } = req.body;
  signupValidate(req.body)
    .then(() => bcrypt.hash(password, 10))
    .then((hashedPassword) => userQueries.addUserQuery({
      username, email, hashedPassword, avatarUrl,
    }))
    .then((result) => {
      if (result.rowCount) {
        [res.user] = result.rows;
        return result.rows[0];
      }
      return null;
    })
    .then((user) => ((user) ? generateToken(user) : null))
    .then((token) => {
      if (token) {
        res.status(200).cookie('token', token, { httpOnly: true, maxAge: 20000000 }).send({
          message: 'User is added successfully',
          result: res.user,
        });
      }
    })
    .catch((err) => {
      if (!err.messages) {
        const error = new ServerError({
          message: err.detail,
          label: 'Invalid Inputs Error',
          status: 400,
          errors: {},
        });
        if (error.messages.includes('Key (email)') && error.messages.includes('already exists')) {
          error.errors.email = 'email is already exists';
        }
        if (error.messages.includes('Key (username)') && error.messages.includes('already exists')) {
          error.errors.username = 'username is already exists';
        }
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports = signup;
