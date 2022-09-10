const { join } = require('path');

const page404 = (req, res) => {
  res.status(404).sendFile(join(__dirname, '..', '..', '..', 'public', 'html', '404.html'));
};

const page500 = (req, res) => {
  res.status(500).sendFile(join(__dirname, '..', '..', '..', 'public', 'html', '500.html'));
};

module.exports = { page404, page500 };
