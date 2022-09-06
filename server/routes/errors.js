const router = require('express').Router();

router.use((req, res) => {
  res.status(404).send({ message: 'Page not found', status: 404 });
});

/* eslint-disable no-unused-vars */
router.use((err, req, res, next) => {
  res.status(err.status).send(err);
});

module.exports = router;
