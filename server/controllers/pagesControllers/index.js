const homePage = require('./home');
const submitPage = require('./submitPage');
const userProfile = require('./userProfile');
const { page404, page500 } = require('./errorPages');

module.exports = {
  homePage,
  submitPage,
  userProfile,
  page404,
  page500,
};
