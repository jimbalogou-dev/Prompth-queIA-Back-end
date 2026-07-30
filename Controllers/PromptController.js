const Prompt = require('../Model/Prompt');

const getPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ status: 'active', visibility: 'public' });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createPrompt = async (req, res) => {
  try {
    const { titre, description, contenu, categorie, langue, tags, ias } = req.body;

    const newPrompt = await Prompt.create({
      title: titre,
      description: description,
      content: contenu,
      category: categorie,
      language: langue,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      iamodel: ias ? ias.join(', ') : '',
      userId: req.user?.id,
      authorid: req.user?.id,
      visibility: 'public',
      status: 'active'
    });

    res.status(201).json({ success: true, prompt: newPrompt });
  } catch (error) {
    console.log('Erreur createPrompt:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt introuvable.' });
    }
    res.json(prompt);
  } catch (error) {
    console.log('Erreur getPromptById:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await Prompt.aggregate([
      { $match: { status: 'active', visibility: 'public' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(categories);
  } catch (error) {
    console.log('Erreur getCategories:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const getMyPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ userId: req.user._id });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getPrompts, createPrompt, getPromptById, getCategories, getMyPrompts };