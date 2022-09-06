const addPostQuery = require('./addPostQuery');
const allPostsQuery = require('./allPostsQuery');
const allPostsOrderedByDateQuery = require('./allPostsOrderedByDateQuery');
const allPostsOrderedByVoteQuery = require('./allPostsOrderedByVoteQuery');
const deletePostQuery = require('./deletePostQuery');
const userPostsQuery = require('./userPostsQuery');
const searchPostsQuery = require('./searchPostsQuery');

module.exports = {
  addPostQuery,
  allPostsQuery,
  allPostsOrderedByDateQuery,
  allPostsOrderedByVoteQuery,
  deletePostQuery,
  userPostsQuery,
  searchPostsQuery,
};
