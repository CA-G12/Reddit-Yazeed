const router = require('express').Router();

router.use((req, res) => {
  res.status(404).send({ message: 'Page not found', status: 404 });
});

/* eslint-disable no-unused-vars */
router.use((err, req, res, next) => {
  res.status(500).send({ message: 'Internal Server Error', status: err.status });
});

module.exports = router;
