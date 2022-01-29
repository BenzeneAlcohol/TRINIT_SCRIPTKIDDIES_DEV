module.exports.isLoggedIn = function (req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    req.flash('error', 'you must be signed in');
    return res.redirect('/login');
  }
  next();
};
