const express = require('express');
const {
  getCollections,
  createCollection,
  addToCollection,
  removeFromCollection,
  getCollectionItems
} = require('../Controllers/CollectionController.js');
const { protect } = require('../Middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, getCollections);
router.post('/', protect, createCollection);
router.post('/items', protect, addToCollection);
router.delete('/items/:id', protect, removeFromCollection);
router.get('/:id/items', protect, getCollectionItems);

module.exports = router;