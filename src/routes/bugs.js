const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const bugs = require('../controllers/bugs');
const {
  isLoggedIn,
  accessCheckBug,
  isReporter,
  isBugExpert,
} = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
  .route('/')
  .post(isLoggedIn, upload.array('image'), catchAsync(bugs.reportBug));

router.get('/new', isLoggedIn, catchAsync(bugs.renderNewForm));

router
  .route('/:bugId')
  .get(isLoggedIn, catchAsync(accessCheckBug), catchAsync(bugs.showBug))
  .put(
    isLoggedIn,
    catchAsync(isReporter),
    upload.array('image'),
    catchAsync(bugs.editBug),
  )
  .delete(isLoggedIn, catchAsync(isBugExpert), catchAsync(bugs.deleteBug));

router
  .route('/:bugId/discussions')
  .get(isLoggedIn, catchAsync(accessCheckBug), catchAsync(bugs.discussion))
  .post(
    isLoggedIn,
    catchAsync(accessCheckBug),
    catchAsync(bugs.postDiscussion),
  );

router
  .route('/:bugId/assign')
  .post(isLoggedIn, catchAsync(isBugExpert), catchAsync(bugs.assign));

router
  .route('/:bugsId/status')
  .post(isLoggedIn, catchAsync(isReporter), catchAsync(bugs.changeStatus));
router
  .route('/:bugId/request')
  .post(isLoggedIn, catchAsync(accessCheckBug), catchAsync(bugs.request));

router.get(
  '/:bugId/edit',
  isLoggedIn,
  catchAsync(isReporter),
  catchAsync(bugs.renderEditForm),
);

module.exports = router;
