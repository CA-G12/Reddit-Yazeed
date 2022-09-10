const router = require('express').Router();
const { votesControllers } = require('../controllers');

router.get('/api/v1/user/:username/upvoted', votesControllers.userUpvoted);
router.get('/api/v1/user/:username/downvoted', votesControllers.userDownvoted);
router.post('/api/v1/vote', votesControllers.updateVote);
router.delete('/api/v1/vote', votesControllers.deleteVote);

module.exports = router;
