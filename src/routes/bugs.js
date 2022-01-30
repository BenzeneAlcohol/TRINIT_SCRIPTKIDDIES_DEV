const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const bugs = require('../controllers/bugs');
const { isLoggedIn } = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
  .route('/')
  .post(isLoggedIn, upload.array('image'), catchAsync(bugs.reportBug));

router.get('/new', isLoggedIn, catchAsync(bugs.renderNewForm));

router
  .route('/:bugId')
  .get(isLoggedIn, catchAsync(bugs.showBug))
  .put(isLoggedIn, upload.array('image'), catchAsync(bugs.editBug))
  .delete(catchAsync(bugs.deleteBug));

router
  .route('/:bugId/discussions')
  .get(isLoggedIn, catchAsync(bugs.discussion))
  .post(bugs.postDiscussion);

router.route('/:bugId/assign').post(isLoggedIn, bugs.assign);

router.route('/:bugId/request').post(isLoggedIn, bugs.request);

router.get('/:bugId/edit', isLoggedIn, catchAsync(bugs.renderEditForm));

module.exports = router;
