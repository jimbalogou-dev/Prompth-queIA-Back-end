const Collection = require('../Model/Collection');
const CollectionItem = require('../Model/CollectionItem');

const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.user._id });
    const withCounts = await Promise.all(
      collections.map(async (c) => {
        const count = await CollectionItem.countDocuments({ collectionId: c._id });
        return { ...c.toObject(), count };
      })
    );
    res.json(withCounts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createCollection = async (req, res) => {
  const { title, description } = req.body;
  try {
    const collection = await Collection.create({
      title,
      name: title,
      description,
      userId: req.user._id
    });
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const addToCollection = async (req, res) => {
  const { collectionId, promptId } = req.body;
  try {
    const existing = await CollectionItem.findOne({ collectionId, promptId, userId: req.user._id });
    if (existing) {
      return res.status(409).json({ message: 'Déjà dans cette collection.' });
    }
    const item = await CollectionItem.create({
      name: 'item',
      collectionId,
      promptId,
      userId: req.user._id
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const removeFromCollection = async (req, res) => {
  try {
    await CollectionItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCollectionItems = async (req, res) => {
  try {
    const items = await CollectionItem.find({ collectionId: req.params.id }).populate('promptId');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getCollections,
  createCollection,
  addToCollection,
  removeFromCollection,
  getCollectionItems
};