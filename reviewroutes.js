const express = require('express');
const reviewController = require('./controller/reviewController');
const authController = require('./controller/authcountroller');

const reviewRouter = express.Router();
reviewRouter
  .route('/createReview')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );
reviewRouter.route('/getallReview').get(reviewController.getallReview);
module.exports = reviewRouter;
