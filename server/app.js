require('env2')('.env');
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const middlewares = require('./middlewares');
const {
  errorRouter,
  postsRouter,
  commentsRouter,
  usersRouter,
  pagesRouter,
  votesRouter,
} = require('./routes');

const app = express();
app.set('PORT', process.env.PORT || 3000);

app.disable('x-powered-by');
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(express.static(join(__dirname, '..', 'public')));

app.use(middlewares.checkUser);

app.use(
  postsRouter,
  commentsRouter,
  usersRouter,
  pagesRouter,
  votesRouter,
  // errorRouter,
);

app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, '..', 'public', 'html', '404.html'));
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err);
});

module.exports = app;
