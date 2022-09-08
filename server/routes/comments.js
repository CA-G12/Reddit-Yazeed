const router = require('express').Router();
const { commentsControllers } = require('../controllers');

router.get('/api/v1/user/:username/comments', commentsControllers.userComments);
router.get('/api/v1/post/:postid/comments', commentsControllers.postComments);
router.post('/api/v1/comment', commentsControllers.addComment);
router.delete('/api/v1/comment', commentsControllers.deleteComment);

router.get('/post/:postid/comments', commentsControllers.postCommentsPage);
module.exports = router;
