const Team = require('./models/team');
const Bug = require('./models/bug');
const User = require('./models/user');

module.exports.isLoggedIn = function (req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    req.flash('error', 'you must be signed in');
    return res.redirect('/login');
  }
  next();
};

module.exports.isExpert = async function (req, res, next) {
  const teamc = await Team.findById(req.params.id).populate('members.user');
  const members = teamc.members.filter(
    (x) => x.user.username == req.user.username,
  );
  if (members.length > 0 && members[0].role === 'Expert') next();
  else {
    req.flash('error', "You Don't have that permission.");
    res.redirect(`/teams`);
  }
};

module.exports.accessCheckBug = async function (req, res, next) {
  const bug = await Bug.findById(req.params.bugId)
    .populate('finder')
    .populate('team')
    .populate('assignee');
  if (req.user.username === bug.finder.username) next();
  else if (bug.assignee.some((x) => x.username === req.user.username)) next();
  else {
    const teams = await Team.findById(bug.team._id).populate('members.user');
    const member = teams.members.filter(
      (x) => x.user.username === req.user.username,
    );
    if (member.length > 0) {
      if (member[0].role === 'Expert') next();
      else if (bug.priority !== 'Critical' && member[0].role === 'Intermediate')
        next();
      else if (bug.priority === 'Nominal' && member[0].role === 'Beginner')
        next();
      else {
        req.flash('error', "You Don't have that permission.1");
        res.redirect(`/teams`);
      }
    } else {
      req.flash('error', "You Don't have that permission.2");
      res.redirect(`/teams`);
    }
  }
};

module.exports.isReporter = async function (req, res, next) {
  const bug = await Bug.findById(req.params.bugId)
    .populate('finder')
    .populate('team');
  if (req.user.username === bug.finder.username) next();
  else {
    const teams = await Team.findById(bug.team._id).populate('members.user');
    const member = teams.members.filter(
      (x) => x.user.username === req.user.username,
    );
    if (member.length > 0 && member[0].role === 'Expert') next();
    else {
      req.flash('error', "You Don't have that permission.2");
      res.redirect(`/teams`);
    }
  }
};

module.exports.isBugExpert = async function (req, res, next) {
  const bugc = await Bug.findById(req.params.bugId).populate('team');
  const teamsc = await Team.findById(bugc.team._id).populate('members.user');
  const memberc = teamsc.members.filter(
    (x) => x.user.username === req.user.username,
  );
  if (memberc.length > 0 && memberc[0].role === 'Expert') next();
  else {
    req.flash('error', "You Don't have that permission.2");
    res.redirect(`/teams`);
  }
};
