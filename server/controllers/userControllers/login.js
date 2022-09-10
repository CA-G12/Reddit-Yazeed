const bcrypt = require('bcryptjs');
require('env2')('.env');
const { userQueries } = require('../../database/queries');
const ServerError = require('../../errors/serverError');
const { signupValidate } = require('../../validation');
const generateToken = require('../../utils/generateToken');

const login = (req, res, next) => {
  const {
    username, email, password,
  } = req.body;

  const payload = {};
  signupValidate({ username, password })
    .then(() => (username
      ? userQueries.checkUsernameQuery(username)
      : userQueries.checkEmailQuery(email)))
    .then((result) => {
      if (result.rowCount) {
        payload.id = result.rows[0].id;
        payload.username = result.rows[0].username;
        payload.email = result.rows[0].email;
        payload.avatarUrl = result.rows[0].avatarUrl;
        return bcrypt.compare(password, result.rows[0].password);
      }
      throw new ServerError({
        message: 'Failed to login with your username and password',
        errors: {
          username: 'Username or password are wrong',
        },
      });
    })
    .then((valid) => {
      if (!valid) {
        throw new ServerError({
          message: 'Failed to login with your username and password',
          errors: {
            username: 'Username or password are wrong',
          },
        });
      } else return generateToken(payload);
    })
    .then((token) => {
      res.status(200).cookie('token', token, { httpOnly: true, maxAge: 20000000 }).json({
        message: 'Login succeeded, Welcome to our website',
        result: payload,
      });
    })
    .catch((err) => {
      const error = new ServerError({
        message: err.detail || err.messages,
        label: 'Invalid Inputs Error',
        status: 400,
        errors: err.errors || {},
      });
      next(error);
    });
};

module.exports = login;
