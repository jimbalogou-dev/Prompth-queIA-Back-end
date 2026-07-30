const Contact = require('../Model/Contact');

const sendMessage = async (req, res) => {
  const { email, message } = req.body;

  try {
    const contact = await Contact.create({ email, message });
    res.status(201).json({ success: true, contact });
  } catch (error) {
    console.log('error', error.message);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
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

module.exports = { sendMessage, getMessages };