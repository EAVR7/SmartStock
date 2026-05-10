const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token faltante o inválido." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado." });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Acceso denegado." });
    }

    return next();
  };
}

module.exports = {
  authenticateToken,
  requireRole,
};
