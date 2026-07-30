const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Model/User.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const isEmail = identifier.includes('@');

    const user = isEmail
      ? await User.findOne({ email: identifier })
      : await User.findOne({ phoneNumber: identifier });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const register = async (req, res) => {
  const { username, email, password, fullName, phoneNumber } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      fullName,
      phoneNumber,
      passwordHash: hashedPassword
    });

    const token = generateToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log('error', error.message)

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Cet email est déjà utilisé."
      });
    }

    res.status(500).json({ success: false, message: "Erreur lors de l'inscription." });
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const isMatch = await comparePassword(currentPassword, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect.' });
    }

    user.passwordHash = await hashPassword(newPassword);
    await user.save();

    res.json({ success: true, message: 'Mot de passe modifié avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: true, message: 'Si ce compte existe, un email a été envoyé.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await user.save();

    const resetUrl = `http://localhost:5173/ResetPassword/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe - Promptèque IA',
      html: `
        <p>Vous avez demandé une réinitialisation de mot de passe.</p>
        <p><a href="${resetUrl}">Cliquez ici pour réinitialiser votre mot de passe</a></p>
        <p>Ce lien expire dans 1 heure. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
      `
    });

    res.json({ success: true, message: 'Si ce compte existe, un email a été envoyé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Lien invalide ou expiré.' });
    }

    user.passwordHash = await hashPassword(newPassword);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ success: true, message: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { generateToken, hashPassword, comparePassword, login, register, getMe, changePassword, forgotPassword, resetPassword };