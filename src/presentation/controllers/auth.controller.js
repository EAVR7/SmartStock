const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../../data/repositories/user.repository");

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son obligatorios." });
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    return res
      .status(401)
      .json({ message: "Usuario o contraseña incorrectos." });
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    return res
      .status(401)
      .json({ message: "Usuario o contraseña incorrectos." });
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

  return res.json({ token, user: payload });
}

function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = {
  login,
  me,
};
