const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Accès refusé. Token manquant.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur introuvable.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Compte suspendu ou banni.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.roles && req.user.roles.includes("admin")) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Accès réservé aux administrateurs.",
    });
  }
};

module.exports = { protect, adminOnly };