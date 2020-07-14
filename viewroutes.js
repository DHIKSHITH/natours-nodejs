const express = require('express');
const viewController = require('./controller/viewsController');
const authcontroller = require('./controller/authcountroller');

const router = express.Router();

router.get('/', authcontroller.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authcontroller.isLoggedIn, viewController.getTour);

router.get('/login', authcontroller.isLoggedIn, viewController.getLoginForm);
router.get('/me', authcontroller.protect, viewController.getAccount);

module.exports = router;
