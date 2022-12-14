const router = require('express').Router();
const { userControllers } = require('../controllers');
const middlewares = require('../middlewares/');

router.post('/login', userControllers.login);
router.post('/signup', userControllers.signup);
router.get('/auth-user', middlewares.authUser);
router.get('/check-auth', middlewares.checkAuth);
router.get('/logout', userControllers.logout);

module.exports = router;
