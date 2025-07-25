// middlewares/auth.js
const jwt = require('jsonwebtoken');

// ✅ Vérifie que le token est présent et valide
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format : "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'Token manquant' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });

    req.user = user; // Le payload du token (ex: { id, role, ... })
    next();
  });
};

// ✅ Vérifie que l’utilisateur a un des rôles requis
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé : rôle insuffisant' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole
};
