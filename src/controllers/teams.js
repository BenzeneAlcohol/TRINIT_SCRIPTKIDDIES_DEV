const Team = require('../models/team');
const User = require('../models/user');

module.exports.renderNewForm = async (req, res) => {
  res.render('teams/new');
};

module.exports.index = async (req, res) => {
  const user = await User.findById(req.user._id);
  const myteams = user.teams;
  const teams = await Team.find({});
  res.render('/teams/index', { myteams, teams });
};

module.exports.createTeam = async (req, res) => {
  const user = await User.findById(req.user._id);
  const team = new Team(req.body);
  console.log(req.body);
  team.members.push({ user, role: 'Expert' });
  await team.save();
  user.teams.push({ team, role: 'Expert' });
  await user.save();
  req.flash('success', 'Successfully created a new Team');
  res.redirect(`/teams/${team._id}`);
};

module.exports.addMember = async () => {
  const team = await Team.findById(req.params.id);
  const user = await User.findOne({ username: req.body.username });
  team.members.push({ user, role: req.body.role });
  await team.save();
  user.teams.push({ team, role: req.body.role });
  await user.save();
  req.flash('success', 'Successfully added the member');
  res.redirect(`/teams/${team._id}`);
};

module.exports.showTeam = async (req, res) => {
  const team = await Team.findById(req.params.id)
    .populate('members.user')
    .populate('bugs');
  if (!team) {
    req.flash('error', 'Cannot find the specified team');
    res.redirect(`/teams`);
  }
  res.render('teams/show', { team });
};

module.exports.renderEditForm = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    req.flash('error', 'Cannot find the specified Bug');
    res.redirect(`/teams`);
  }
  res.render('teams/edit', { team });
};
module.exports.editTeam = async (req, res) => {
  await Team.findByIdAndUpdate(req.params.id, {
    ...req.body.team,
  });
  req.flash('success', 'Successfully updated Team!');
  res.redirect(`/teams/${req.params.bugId}`);
};
module.exports.deleteTeam = async (req, res) => {
  const { bugId } = req.params;
  const team = await Team.findById(id);
  if (team.bugs) {
    req.flash(
      'error',
      'You need to delete all the bugs of the team before deleting Team',
    );
    return res.redirect(`/teams/${team._id}`);
  }
  await Team.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted Team. :(');
  res.redirect(`/teams/`);
};
