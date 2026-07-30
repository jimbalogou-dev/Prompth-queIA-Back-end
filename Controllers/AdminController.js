const User = require('../Model/User');
const Prompt = require('../Model/Prompt');
const Contact = require('../Model/Contact');

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPrompts = await Prompt.countDocuments();
    const totalMessages = await Contact.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });

    res.json({ totalUsers, totalPrompts, totalMessages, activeUsers });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createDate: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateUserStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createDate: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deletePrompt = async (req, res) => {
  try {
    await Prompt.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getStats,
  getUsers,
  updateUserStatus,
  getAllPrompts,
  deletePrompt,
  getMessages
};