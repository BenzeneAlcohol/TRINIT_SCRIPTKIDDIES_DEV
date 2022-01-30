const { cloudinary } = require('../cloudinary');
const Bug = require('../models/bug');
const Team = require('../models/team');
const User = require('../models/user');

module.exports.renderNewForm = async (req, res) => {
  res.render('bugs/new', { teamId: req.params.id });
};

module.exports.reportBug = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    req.flash('error', 'Cannot find the specified Team');
    res.redirect(`/teams`);
  }
  const user = await User.findById(req.user._id);
  const bug = new Bug(req.body.bug);
  bug.finder = req.user;
  bug.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  bug.team = team;
  bug.finder = user;
  await bug.save();
  team.bugs.push(bug);
  await team.save();
  user.bugsFound.push(bug);
  await user.save();
  req.flash('success', 'Successfully added the new Bug!');
  res.redirect(`/teams/${req.params.bugId}/bugs/${bug._id}`);
};

module.exports.assign = async (req, res) => {
  const bug = await Bug.findById(req.params.bugId);
  const user = await User.findOne({ username: req.body.username });
  bug.assignee.push(user);
  if (bug.status == 'open') bug.status = 'assigned';
  await bug.save();
  user.assigned.push(bug);
  await user.save();
  req.flash('success', 'Successfully assigned the bug');
  res.redirect(`/teams/${req.params.bugId}/bugs/${bug._id}`);
};

module.exports.request = async (req, res) => {
  const bug = await Bug.findById(req.params.bugId);
  const user = await User.findOne({ username: req.body.username });
  bug.requests.push(user);
  await bug.save();
  req.flash('success', 'Successfully requested the bug');
  res.redirect(`/teams/${req.params.bugId}/bugs/${bug._id}`);
};

module.exports.discussion = async (req, res) => {
  const bug = await Bug.findById(req.params.bugId)
    .populate('discussions.user')
    .populate('finder');
  res.render('bugs/discussions/show', { bug });
};

module.exports.postDiscussion = async (req, res) => {
  const bug = await Bug.findById(req.params.bugId).populate('team');
  const user = await User.findById(req.user._id);
  bug.discussions.push({
    user: user,
    TimePosted: Date.now(),
    text: req.body.text,
  });
  await bug.save();
  res.redirect(`/teams/${bug.team._id}/bugs/${bug._id}/discussions`);
};

module.exports.showBug = async (req, res) => {
  const bug = await Bug.findById(req.params.bugId)
    .populate('finder')
    .populate('assignee')
    .populate('team')
    .populate('requests');
  if (!bug) {
    req.flash('error', 'Cannot find the specified Bug');
    res.redirect(`/${req.params.bugId}`);
  }
  res.render('bugs/show', { bug });
};

module.exports.renderEditForm = async (req, res) => {
  const bugId = await Bug.findById(req.params.bugId);
  if (!bugId) {
    req.flash('error', 'Cannot find the specified Bug');
    res.redirect('bugs');
  }
  res.render('bugs/edit', { bugId });
  
};

module.exports.editBug = async (req, res) => {
  const { id } = req.params;
  const bug = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.bug });
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  bug.images.push(...imgs);
  await bug.save();
  console.log(req.body.deleteImages ? 1 : 0);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await bug.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } }, { new: true });
    console.log(bug);
  }
  req.flash('success', 'Successfully updated Campground!')
  res.redirect(`/campgrounds/${bug._id}`);
};

module.exports.deleteBug = async (req, res) => {
  const { bugId } = req.params;
  const bug = await Bug.findById(bugId);
  if (!bug.author.equals(req.user._id)) {
    req.flash('error', 'you do no have permission to do that!');
    return res.redirect(`/teams/${req.params.bugId}/bugs/${bug._id}`);
  }
  await Bug.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted Bug. :(');
  res.redirect(`/teams/${req.params.bugId}`);
};

module.exports.changeStatus = async (req, res) => {
  const bug = await Bug.findById(req.params.bugId);
  bug.status = req.body.status;
  await bug.save();
  req.flash('success', 'Successfully changed the status of the bug');
  res.redirect('/teams/${req.params.bugId}/bugs/${bug._id}');
};
