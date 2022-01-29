const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const teams = require('../controllers/teams');
const { isLoggedIn } = require('../middleware');

router
  .route('/')
  .get(catchAsync(teams.index))
  .post(isLoggedIn, catchAsync(teams.createTeam));

router.get('/new', isLoggedIn, catchAsync(teams.renderNewForm));

router
  .route('/:id')
  .get(catchAsync(teams.showTeam))
  .put(isLoggedIn, catchAsync(teams.editTeam))
  .delete(catchAsync(teams.deleteTeam));

router.route('/:id/members').post(isLoggedIn, catchAsync(teams.addMember));

module.exports = router;
