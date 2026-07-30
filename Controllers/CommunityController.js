const User = require('../Model/User');
const Prompt = require('../Model/Prompt');
const Discussion = require('../Model/Discussion');

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPrompts = await Prompt.countDocuments();
    res.json({ totalUsers, totalPrompts });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getTopContributors = async (req, res) => {
  try {
    const top = await Prompt.aggregate([
      { $group: { _id: '$userId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const enriched = await Promise.all(
      top.map(async (t) => {
        const user = await User.findById(t._id);
        return {
          username: user ? user.username : 'Utilisateur supprimé',
          count: t.count
        };
      })
    );

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const postDiscussion = async (req, res) => {
  const { username, message } = req.body;
  try {
    const discussion = await Discussion.create({ username, message });
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi' });
  }
};

const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 }).limit(50);
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getStats, getTopContributors, postDiscussion, getDiscussions };