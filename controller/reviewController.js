const review = require('../models/reviewmodel');
const catchAsync = require('../utils/catchasync');

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await review.create(req.body);
  res.status(200).json({
    status: 'pass',
    data: {
      review: newReview
    }
  });
});

exports.getallReview = catchAsync(async (req, res, next) => {
  const allreview = await review.find();
  res.status(200).json({
    status: 'pass',
    results: allreview.length,
    data: {
      allreview
    }
  });
});
