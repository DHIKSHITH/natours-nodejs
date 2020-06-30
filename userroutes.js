const express = require('express');

const usercontroller = require('./controller/usercontroller');

const authcontroller = require('./controller/authcountroller');

const userrouter = express.Router();

userrouter.route('/signup').post(authcontroller.signup);
userrouter.route('/login').post(authcontroller.login);

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
