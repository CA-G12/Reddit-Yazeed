const router = require('express').Router();
const { commentsControllers } = require('../controllers');

router.get('/api/v1/user/:username/comments', commentsControllers.userComments);
router.get('/api/v1/user/:username/post/comments/:postid', commentsControllers.postComments);
router.post('/api/v1/comment', commentsControllers.addComment);
router.delete('/api/v1/comment', commentsControllers.deleteComment);

module.exports = router;
