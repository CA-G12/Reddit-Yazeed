const router = require('express').Router();
const { homeControllers } = require('../controllers');
const { pageControllers } = require('../controllers');

router.get('/', homeControllers.homePage);

router.get('/user/:username/', homeControllers.userProfile);
router.get('/user/:username/posts', homeControllers.userProfile);
router.get('/user/:username/comments', homeControllers.userProfile);
router.get('/user/:username/upvoted', homeControllers.userProfile);
router.get('/user/:username/downvoted', homeControllers.userProfile);

router.get('/user/:username/submit', homeControllers.submitPage);

router.get('/error/404', pageControllers.page404);
router.get('/error/500', pageControllers.page500);

module.exports = router;
