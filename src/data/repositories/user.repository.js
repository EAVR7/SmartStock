const { User } = require("../models");

async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function findById(id) {
  return User.findByPk(id);
}

async function listAll() {
  return User.findAll({
    attributes: ["id", "name", "email", "role", "settings", "createdAt"],
    order: [["id", "ASC"]],
  });
}

async function create(data) {
  return User.create(data);
}

async function updateSettings(id, settings) {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }

  return user.update({ settings });
}

module.exports = {
  findByEmail,
  findById,
  listAll,
  create,
  updateSettings,
};
