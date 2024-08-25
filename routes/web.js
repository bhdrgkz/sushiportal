const express = require('express');
const router = express.Router();
const DashboardController = require('../app/controllers/DashboardController');
const AuthController = require('../app/controllers/AuthController');

router.get('/dashboard', DashboardController.dashboardPage);
router.get('/point-request', DashboardController.dashboardPointRequestPage);





router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.signUp);

module.exports = router;