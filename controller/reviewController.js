// const catchAsync = require('../utils/catchasync');
const factory = require('./handlerFactory');
const Review = require('../models/reviewmodel');

exports.setTourUserIds = (req, res, next) => {
  //nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);

exports.getallReview = factory.getAll(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.getReview = factory.getOne(Review);
