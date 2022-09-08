const addPostQuery = require('./addPostQuery');
const allPostsQuery = require('./allPostsQuery');
const allPostsOrderedByDateQuery = require('./allPostsOrderedByDateQuery');
const allPostsOrderedByVoteQuery = require('./allPostsOrderedByVoteQuery');
const singlePostQuery = require('./singlePostQuery');
const deletePostQuery = require('./deletePostQuery');
const userPostsQuery = require('./userPostsQuery');
const searchPostsQuery = require('./searchPostsQuery');
const categoryPostsQuery = require('./categoryPostsQuery');

module.exports = {
  addPostQuery,
  allPostsQuery,
  allPostsOrderedByDateQuery,
  allPostsOrderedByVoteQuery,
  deletePostQuery,
  userPostsQuery,
  searchPostsQuery,
  categoryPostsQuery,
  singlePostQuery,
};
