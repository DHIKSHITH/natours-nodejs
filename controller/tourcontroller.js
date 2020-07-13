/* eslint-disable no-console */
/* eslint-disable prefer-object-spread */

const Tour = require('../models/tourmodel');

const catchAsync = require('../utils/catchasync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getalltoursHandler = factory.getAll(Tour);
//exports.getalltoursHandler = catchAsync(async (req, res, next) => {
//   // console.log(req.query);
//   //Build the query
//   //1)filtering
//   // const queryObj = { ...req.query };
//   // const excludedfields = ['page', 'sort', 'limit', 'fields'];
//   // excludedfields.forEach(el => delete queryObj[el]);

//   // //1b)advance filtering
//   // let queryStr = JSON.stringify(queryObj);
//   // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//   // console.log(JSON.parse(queryStr));

//   //{difficulty:'easy',duration:{$gte:5}}///manual in mongo
//   //{difficulty:'easy',duration:{gte:'5'}}///o/p express gives us
//   //gte,gt,lte,lt

//   //2)sorting
//   // if (req.query.sort) {
//   //   const sortBy = req.query.sort.split(',').join(' ');
//   //   console.log(sortBy); //in url we cannot leave a space so we split the comma and join the space
//   //   query = query.sort(sortBy);
//   //   //sort{'price ratingsAverage'}
//   // } else {
//   //   query = query.sort('-createdAt'); //[- in sort means decending order]
//   // }

//   //3)field limiting
//   // if (req.query.fields) {
//   //   const fields = req.query.fields.split(',').join(' ');
//   //   query = query.select(fields);
//   // } else {
//   //   query = query.select('-__v'); //it removes __v excluding[- in select means exclude]
//   // }

//   //4)pagination
//   //page=2&limit=10 1-10 page1.11-20 page2
//   // const page = req.query.page * 1 || 1;
//   // const limit = req.query.limit * 1 || 100;
//   // const skip = (page - 1) * limit;
//   // query = query.skip(skip).limit(limit);
//   // if (req.query.page) {
//   //   const numTours = await Tour.countDocuments();
//   //   if (skip >= numTours) throw new Error('this page does not exists');
//   // }

//   //execute the query
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .pagination();

//   const tours = await features.query;

//   //send response

//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours
//     }
//   });
// });

exports.gettourHandler = factory.getOne(Tour, { path: 'reviews' });

exports.createtour = factory.createOne(Tour);

exports.updatetour = factory.updateOne(Tour);

exports.deletetour = factory.deleteOne(Tour);

// exports.deletetour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);
//   if (!tour) {
//     return next(new AppError('no tour found with that id', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        // _id: '$ratingsAverage',
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numTourStarts: -1 }
    },
    {
      $limit: 12
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, lating, unit } = req.params;
  const [lat, lng] = lating.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    next(
      new AppError(
        'pls provide latitude and longitude in the format of lat,lng',
        400
      )
    );
  }
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours
    }
  });
});

exports.getDistance = catchAsync(async (req, res, next) => {
  const { lating, unit } = req.params;
  const { lat, lng } = lating.split(',');
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  if (!lat || !lng) {
    next(
      new AppError(
        'pls provide latitude and longitude in the format of lat,lng',
        400
      )
    );
  }
  const dist = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'point',
          coordinate: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);
  res.status(200).json({
    status: 'success',
    results: dist.length,
    data: {
      data: dist
    }
  });
});
