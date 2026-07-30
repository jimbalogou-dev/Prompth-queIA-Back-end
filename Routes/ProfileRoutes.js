const express = require('express');
const multer = require('multer');
const path = require('path');
const { updateAvatar, updateProfile, getStats } = require('../Controllers/profileController.js');
const { protect } = require('../Middleware/authMiddleware.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont acceptées.'));
    }
  }
});

const router = express.Router();

router.get('/stats', protect, getStats);
router.put('/avatar', protect, upload.single('avatar'), updateAvatar);
router.put('/', protect, updateProfile);

module.exports = router;