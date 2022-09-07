const router = require('express').Router();
const { postsControllers } = require('../controllers');

// API routes
router.get('/api/v1/posts', postsControllers.allPosts);
router.get('/api/v1/posts/hot', postsControllers.allPostsOrderedByVote);
router.get('/api/v1/posts/new', postsControllers.allPostsOrderedByDate);
router.get('/api/v1/posts/search', postsControllers.searchPosts);

router.get('/api/v1/user/:username/posts', postsControllers.userPosts);
router.post('/api/v1/post', postsControllers.addPost);
router.delete('/api/v1/post', postsControllers.deletePost);

// Pages routes

module.exports = router;
