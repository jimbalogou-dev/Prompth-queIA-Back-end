const express = require('express');
const router = express.Router();
const { getPrompts, createPrompt, getPromptById, getCategories, getMyPrompts, } = require('../Controllers/promptController.js');
const { protect } = require('../Middleware/authMiddleware.js');

router.get('/user/me', protect, getMyPrompts)
router.get('/', getPrompts);
router.get('/stats/categories', getCategories)
router.get('/:id', getPromptById);
router.post('/', protect, createPrompt);

module.exports = router;