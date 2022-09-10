const logout = (req, res, next) => {
  console.log(res.cookies);
  res.cookie('token', '', { maxAge: 1 }).send({ message: 'User is logged out', status: 200 });
};

module.exports = logout;
