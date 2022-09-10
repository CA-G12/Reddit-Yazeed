const router = require('express').Router();
const { postsControllers } = require('../controllers');
const { authUser, checkUser } = require('../middlewares');

// API routes
router.get('/api/v1/posts', postsControllers.allPosts);
router.get('/api/v1/posts/hot', postsControllers.allPostsOrderedByVote);
router.get('/api/v1/posts/new', postsControllers.allPostsOrderedByDate);
router.get('/api/v1/posts/search', postsControllers.searchPosts);
router.get('/api/v1/posts/category/:category', postsControllers.categoryPosts);

router.get('/api/v1/posts/:postid/', postsControllers.singlePost);
router.get('/api/v1/user/:username/posts', postsControllers.userPosts);
router.post('/api/v1/post', authUser, postsControllers.addPost);
router.delete('/api/v1/post', authUser, postsControllers.deletePost);

// Pages routes

module.exports = router;
