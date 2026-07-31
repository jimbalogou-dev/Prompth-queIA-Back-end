const express = require('express');
const { addFavori, removeFavori, getFavoris } = require('../Controllers/FavorisController.js');
const { protect } = require('../Middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, getFavoris);
router.post('/', protect, addFavori);
router.delete('/:promptId', protect, removeFavori);

module.exports = router;