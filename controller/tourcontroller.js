/* eslint-disable no-console */
/* eslint-disable prefer-object-spread */

const Tour = require('../models/tourmodel');
const APIFeatures = require('../utils/apiFeatures');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getalltoursHandler = async (req, res) => {
  try {
    console.log(req.query);
    //Build the query
    //1)filtering
    // const queryObj = { ...req.query };
    // const excludedfields = ['page', 'sort', 'limit', 'fields'];
    // excludedfields.forEach(el => delete queryObj[el]);

    // //1b)advance filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // console.log(JSON.parse(queryStr));

    //{difficulty:'easy',duration:{$gte:5}}///manual in mongo
    //{difficulty:'easy',duration:{gte:'5'}}///o/p express gives us
    //gte,gt,lte,lt

    //2)sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy); //in url we cannot leave a space so we split the comma and join the space
    //   query = query.sort(sortBy);
    //   //sort{'price ratingsAverage'}
    // } else {
    //   query = query.sort('-createdAt'); //[- in sort means decending order]
    // }

    //3)field limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v'); //it removes __v excluding[- in select means exclude]
    // }

    //4)pagination
    //page=2&limit=10 1-10 page1.11-20 page2
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('this page does not exists');
    // }

    //execute the query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const tours = await features.query;

    //send response

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.gettourHandler = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //tour.findone({_id:req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createtour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent'
    });
  }
  // const newtour=new Tour();
  // newtour.save()//
};

exports.updatetour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent'
    });
  }
};

exports.deletetour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid data sent'
    });
  }
};
