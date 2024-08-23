const express = require('express');
const router = express.Router();
const DashboardController = require('../app/controllers/DashboardController');
const AuthController = require('../app/controllers/AuthController');

router.get('/dashboard', DashboardController.dashboardPage);
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPasswordPage);
router.post('/forgot-password', AuthController.forgotPassword);

module.exports = router;