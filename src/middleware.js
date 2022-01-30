const Team = require('./models/team');

module.exports.isLoggedIn = function (req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    req.flash('error', 'you must be signed in');
    return res.redirect('/login');
  }
  next();
};

module.exports.isExpert = async function (req, res, next) {
  const team = await Team.findById(req.params.id).populate('members.user');

  const members = team.members.filter(
    (x) => x.user.username == req.user.username,
  );
  if (members.length > 0 && members[0].role === 'Expert') next();
  else {
    req.flash('error', "You Don't have that permission.");
    res.redirect(`/teams`);
  }
};
