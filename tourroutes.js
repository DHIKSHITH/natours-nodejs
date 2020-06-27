const express = require('express');
const tourcontroller = require('./controller/tourcontroller');

const tourrouter = express.Router();
// tourrouter.param('id', tourcontroller.checkid);

tourrouter
  .route('/top-5-cheap')
  .get(tourcontroller.aliasTopTours, tourcontroller.getalltoursHandler);

tourrouter
  .route('/')
  .get(tourcontroller.getalltoursHandler)
  .post(tourcontroller.createtour);

tourrouter
  .route('/:id')
  .get(tourcontroller.gettourHandler)
  .patch(tourcontroller.updatetour)
  .delete(tourcontroller.deletetour);

module.exports = tourrouter;
