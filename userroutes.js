const express = require('express');

const usercontroller = require('./controller/usercontroller');

const authcontroller = require('./controller/authcountroller');

const userrouter = express.Router();

userrouter.route('/signup').post(authcontroller.signup);
userrouter.route('/login').post(authcontroller.login);

userrouter.route('/forgotPassword').post(authcontroller.forgotPassword);
userrouter.route('/resetPassword/:token').patch(authcontroller.resetPassword);

//protect all routes below this middleware
userrouter.use(authcontroller.protect);

userrouter.patch('/updateMyPassword', authcontroller.updatePassword);
userrouter.get('/me', usercontroller.getme, usercontroller.getuser);
userrouter.patch('/updateMe', usercontroller.updateme);
userrouter.delete('/deleteMe', usercontroller.deleteme);

//restrict and protected
userrouter.use(authcontroller.restrictTo('admin'));

userrouter
  .route('/')
  .get(usercontroller.getalluser)
  .post(usercontroller.createuser);
userrouter
  .route('/:id')
  .get(usercontroller.getuser)
  .patch(usercontroller.updateuser)
  .delete(usercontroller.deleteuser);

module.exports = userrouter;
