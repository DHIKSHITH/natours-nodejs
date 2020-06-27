const express = require('express');

const usercontroller = require('./controller/usercontroller');

const userrouter = express.Router();

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
