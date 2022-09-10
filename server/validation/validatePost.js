const joi = require('joi');
const ServerError = require('../errors/serverError');

const validatePost = (post) => {
  const schema = joi.object({
    title: joi.string().required().min(3),
    content: joi.string(),
    type: joi.string().valid('text', 'link').required(),
    category: joi.string().required().valid('all', 'programming', 'music', 'movies', 'memes', 'politics', 'news', 'food', 'videos'),
    imageUrl: joi.string(),
    userId: joi.number().required(),
  });

  return schema.validateAsync(post, { abortEarly: false })
    .catch((err) => {
      const errorMessages = {};
      err.details.forEach((e) => { errorMessages[e.message.split('\"')[1]] = e.message; });
      throw new ServerError({
        message: 'Post data is not valid',
        label: 'Validation Error',
        status: 400,
        errors: errorMessages,
      });
    });
};

module.exports = validatePost;
