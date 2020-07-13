const Tour = require('../models/tourmodel');
const catchAsync = require('../utils/catchasync');

exports.getOverview = catchAsync(async (req, res, next) => {
  //1:get tour data from collection
  const tours = await Tour.find();
  //2:build the template
  //3:render that template using tour data from step 1
  res.status(200).render('overview', {
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};
