const { join } = require('path');

const postCommentsPage = (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', '..', 'public', 'html', 'post_details.html'));
};

module.exports = postCommentsPage;
