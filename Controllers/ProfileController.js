const User = require('../Model/User');
const Prompt = require('../Model/Prompt');
const Favoris = require('../Model/Favoris');

const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucune image fournie.' });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl },
      { new: true }
    ).select('-passwordHash');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la photo.' });
  }
};

const updateProfile = async (req, res) => {
  const { fullName, bio, preferredLanguage } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, bio, preferredLanguage },
      { new: true }
    ).select('-passwordHash');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil.' });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Nombre de prompts publiés
    const promptsCount = await Prompt.countDocuments({ userId });

    // Nombre de favoris
    const favorisCount = await Favoris.countDocuments({ userId });

    // Total des vues
    const viewsResult = await Prompt.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$viewCount' } } }
    ]);
    const viewsCount = viewsResult.length > 0 ? viewsResult[0].total : 0;

    // Note moyenne
    const ratingResult = await Prompt.aggregate([
      { $match: { userId, averageRating: { $gt: 0 } } },
      { $group: { _id: null, avg: { $avg: '$averageRating' } } }
    ]);
    const averageRating = ratingResult.length > 0
      ? ratingResult[0].avg.toFixed(1)
      : 0;

    res.json({ promptsCount, favorisCount, viewsCount, averageRating });
  } catch (error) {
    console.log('Erreur getStats:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { updateAvatar, updateProfile, getStats };