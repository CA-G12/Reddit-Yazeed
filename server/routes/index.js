const errorRouter = require('./errors');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const usersRouter = require('./users');
const pagesRouter = require('./pages');
const votesRouter = require('./votes');

module.exports = {
  errorRouter,
  postsRouter,
  commentsRouter,
  usersRouter,
  pagesRouter,
  votesRouter,
};
