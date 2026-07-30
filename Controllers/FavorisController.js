const Favoris = require('../Model/Favoris');
const Prompt = require('../Model/Prompt');

const addFavori = async (req, res) => {
  const { promptId } = req.body;

  try {
    const existing = await Favoris.findOne({ userId: req.user._id, promptId });
    if (existing) {
      return res.status(409).json({ message: 'Déjà dans vos favoris.' });
    }

    const favori = await Favoris.create({ userId: req.user._id, promptId });
    res.status(201).json(favori);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const removeFavori = async (req, res) => {
  const { promptId } = req.params;

  try {
    await Favoris.findOneAndDelete({ userId: req.user._id, promptId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getFavoris = async (req, res) => {
  try {
    const favoris = await Favoris.find({ userId: req.user._id }).populate('promptId');
    res.json(favoris);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { addFavori, removeFavori, getFavoris };