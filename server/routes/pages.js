const router = require('express').Router();
const { homeControllers } = require('../controllers');

router.get('/', homeControllers.homePage);

router.get('/user/:username/', homeControllers.userProfile);
router.get('/user/:username/posts', homeControllers.userProfile);
router.get('/user/:username/comments', homeControllers.userProfile);
router.get('/user/:username/upvoted', homeControllers.userProfile);
router.get('/user/:username/downvoted', homeControllers.userProfile);

router.get('/user/:username/submit', homeControllers.submitPage);

module.exports = router;
