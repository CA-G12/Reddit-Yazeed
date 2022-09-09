const joi = require('joi');
const ServerError = require('../errors/serverError');

const signupValidate = (user) => {
  const schema = joi.object({
    username: joi.string().required().min(3),
    email: joi.string().email(),
    avatarUrl: joi.string().uri().valid(''),
    password: joi.string().alphanum().min(8).required(),
    confirmPassword: joi.ref('password'),
  });

  return schema.validateAsync(user, { abortEarly: false })
    .catch((err) => {
      const errorMessages = {};
      err.details.forEach((e) => { errorMessages[e.message.split('\"')[1]] = e.message; });
      throw new ServerError({
        message: 'User data is not valid',
        label: 'Validation Error',
        status: 400,
        errors: errorMessages,
      });
    });
};

module.exports = signupValidate;
