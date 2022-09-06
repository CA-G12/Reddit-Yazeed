const router = require('express').Router();
const { userControllers } = require('../controllers');

router.post('/login', userControllers.login);
router.post('/signup', userControllers.signup);

module.exports = router;
