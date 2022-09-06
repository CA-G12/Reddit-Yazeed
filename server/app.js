require('env2')('.env');
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const { env } = require('process');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const {
  errorRouter,
  postsRouter,
  commentsRouter,
  usersRouter,
  pagesRouter,
  votesRouter,
} = require('./routes');

const app = express();
app.set('PORT', env.PORT || 3000);

app.disable('x-powered-by');
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(express.static(join(__dirname, '..', 'public')));

app.use(
  postsRouter,
  commentsRouter,
  usersRouter,
  pagesRouter,
  votesRouter,
  errorRouter,
);

module.exports = app;
