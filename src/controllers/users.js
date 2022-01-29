const User = require('../models/user');
const passport = require('passport');

module.exports.myBugs = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('bugsFound')
    .populate('Assigned');
  const { bugsFound, Assigned } = User;
  res.render('users/index', { bugsFound, Assigned });
};

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

module.exports.createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Bug Tracking System!');
      delete req.session.returnTo;
      res.redirect('/teams');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};

module.exports.loginUser = (req, res) => {
  req.flash('success', 'Welcome Back');
  const redirectUrl = req.session.returnTo || '/bugs';
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash('success', 'Goodbye!');
  res.redirect('/bugs');
};
