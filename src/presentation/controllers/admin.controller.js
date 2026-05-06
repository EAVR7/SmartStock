const bcrypt = require("bcryptjs");
const userRepository = require("../../data/repositories/user.repository");

async function listUsers(req, res) {
  const users = await userRepository.listAll();
  res.json(users);
}

async function createUser(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const normalizedRole = role || "user";
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userRepository.create({
    name,
    email,
    password: passwordHash,
    role: normalizedRole,
  });

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}

module.exports = {
  listUsers,
  createUser,
};
