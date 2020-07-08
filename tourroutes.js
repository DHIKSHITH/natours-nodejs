const express = require('express');
const tourcontroller = require('./controller/tourcontroller');
const authController = require('./controller/authcountroller');
const reviewRouter = require('./reviewroutes');

const tourrouter = express.Router();
// tourrouter.param('id', tourcontroller.checkid);

// tourrouter
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

tourrouter.use('/:tourId/reviews', reviewRouter);

tourrouter.route('/tour-stats').get(tourcontroller.getTourStats);
tourrouter
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourcontroller.getMonthlyPlan
  );

tourrouter
  .route('/top-5-cheap')
  .get(tourcontroller.aliasTopTours, tourcontroller.getalltoursHandler);

tourrouter
  .route('/')
  .get(tourcontroller.getalltoursHandler)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourcontroller.createtour
  );

tourrouter
  .route('/:id')
  .get(tourcontroller.gettourHandler)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourcontroller.updatetour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourcontroller.deletetour
  );

module.exports = tourrouter;
