const express = require("express");
const { login, register, getMe, changePassword, forgotPassword, resetPassword } = require('../Controllers/authController.js');
const {protect} = require("../Middleware/authMiddleware.js");

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect,getMe);
router.put('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;