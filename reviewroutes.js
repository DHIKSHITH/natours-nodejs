const express = require('express');
const reviewController = require('./controller/reviewController');
const authController = require('./controller/authcountroller');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(authController.protect);
reviewRouter
  .route('/')
  .get(reviewController.getallReview)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

reviewRouter
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  );

module.exports = reviewRouter;
