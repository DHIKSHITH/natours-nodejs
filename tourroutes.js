const express = require('express');
const tourcontroller = require('./controller/tourcontroller');
const authController = require('./controller/authcountroller');

const tourrouter = express.Router();
// tourrouter.param('id', tourcontroller.checkid);

tourrouter.route('/tour-stats').get(tourcontroller.getTourStats);
tourrouter.route('/monthly-plan/:year').get(tourcontroller.getMonthlyPlan);

tourrouter
  .route('/top-5-cheap')
  .get(tourcontroller.aliasTopTours, tourcontroller.getalltoursHandler);

tourrouter
  .route('/')
  .get(authController.protect, tourcontroller.getalltoursHandler)
  .post(tourcontroller.createtour);

tourrouter
  .route('/:id')
  .get(tourcontroller.gettourHandler)
  .patch(tourcontroller.updatetour)
  .delete(tourcontroller.deletetour);

module.exports = tourrouter;
