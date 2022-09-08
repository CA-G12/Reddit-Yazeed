const allPosts = require('./allPosts');
const allPostsOrderedByVote = require('./allPostsOrderedByVote');
const allPostsOrderedByDate = require('./allPostsOrderedByDate');
const searchPosts = require('./searchPosts');
const categoryPosts = require('./categoryPosts');
const userPosts = require('./userPosts');
const addPost = require('./addPost');
const deletePost = require('./deletePost');

module.exports = {
  allPosts,
  allPostsOrderedByVote,
  allPostsOrderedByDate,
  searchPosts,
  userPosts,
  addPost,
  deletePost,
  categoryPosts,
};
