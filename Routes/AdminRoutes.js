const express = require('express');
const {
  getStats,
  getUsers,
  updateUserStatus,
  getAllPrompts,
  deletePrompt,
  getMessages
} = require('../Controllers/AdminController.js');
const { protect, adminOnly } = require('../Middleware/authMiddleware.js');

const router = express.Router();

router.get('/stats', protect, adminOnly, getStats);
router.get('/users', protect, adminOnly, getUsers);
router.put('/users/:id/status', protect, adminOnly, updateUserStatus);
router.get('/prompts', protect, adminOnly, getAllPrompts);
router.delete('/prompts/:id', protect, adminOnly, deletePrompt);
router.get('/messages', protect, adminOnly, getMessages);

module.exports = router;