const router = require('express').Router();
const { commentsControllers } = require('../controllers');
const { authUser } = require('../middlewares');

router.get('/api/v1/user/:username/comments', commentsControllers.userComments);
router.get('/api/v1/post/:postid/comments', commentsControllers.postComments);
router.post('/api/v1/comment', authUser, commentsControllers.addComment);
router.delete('/api/v1/comment', authUser, commentsControllers.deleteComment);

router.get('/post/:postid/comments', commentsControllers.postCommentsPage);
module.exports = router;
