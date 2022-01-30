const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const teams = require('../controllers/teams');
const { isLoggedIn, isExpert } = require('../middleware');

router
  .route('/')
  .get(isLoggedIn, catchAsync(teams.index))
  .post(isLoggedIn, catchAsync(teams.createTeam));

router.get('/new', isLoggedIn, catchAsync(teams.renderNewForm));

router
  .route('/:id')
  .get(isLoggedIn, catchAsync(teams.showTeam))
  .put(isLoggedIn, catchAsync(isExpert), catchAsync(teams.editTeam))
  .delete(isLoggedIn, catchAsync(isExpert), catchAsync(teams.deleteTeam));

router
  .route('/:id/edit')
  .get(isLoggedIn, catchAsync(isExpert), catchAsync(teams.renderEditForm));

router
  .route('/:id/members')
  .post(isLoggedIn, catchAsync(isExpert), catchAsync(teams.addMember));

module.exports = router;
