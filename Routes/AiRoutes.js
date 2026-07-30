const express = require('express');
const { testPrompt } = require('../Controllers/AiController.js');
const { protect } = require('../Middleware/authMiddleware.js');

const router = express.Router();
router.post('/test', protect, testPrompt);

module.exports = router;