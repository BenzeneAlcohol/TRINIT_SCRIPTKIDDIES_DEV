const express = require('express');
const router = express.Router({ mergeParams: true });
const teamsController = require('../controllers/teams')
const catchAsync = require('../utils/catchAsync');

router.get('/', teamsController.teams_index)

router.post('/', teamsController.teams_create_team)

router.get('/:id', teamsController.teams_getById)

module.exports = router;
