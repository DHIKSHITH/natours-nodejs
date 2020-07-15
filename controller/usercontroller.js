// eslint-disable-next-line no-unused-vars
const express = require('express');
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const catchAsync = require('../utils/catchasync');
const AppError = require('../utils/appError');
const User = require('../models/usermodel');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getme = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateme = catchAsync(async (req, res, next) => {
  //create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'this route is not for password update pls use update password',
        400
      )
    );
  }
  //filtered out the unwanted field names that are not to updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  //update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteme = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined pls use signup instead'
  });
};

exports.getuser = factory.getOne(User);
exports.getalluser = factory.getAll(User);

//do not update password with this
exports.updateuser = factory.updateOne(User);
exports.deleteuser = factory.deleteOne(User);
