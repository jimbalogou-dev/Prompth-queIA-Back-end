const Prompt = require('../Model/Prompt');

const getPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ status: 'active', visibility: 'public' });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt introuvable' });
    }

    res.json(prompt);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

 const getCategoryCounts = async (req, res) => {
  try {
    const counts = await Prompt.aggregate([
      { $match: { status: 'active', visibility: 'public' } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getPrompts, getPromptById, getCategoryCounts };
