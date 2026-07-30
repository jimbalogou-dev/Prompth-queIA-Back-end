const express = require('express');
const { getPrompts, getPromptById, getCategoryCounts } = require('../Controllers/PromptsDetailController.js');

const router = express.Router();

router.get('/', getPrompts);
router.get('/stats/categories', getCategoryCounts);
router.get('/:id', getPromptById);

module.exports = router;