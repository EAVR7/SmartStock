const { User } = require("../models");

async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function create(data) {
  return User.create(data);
}

module.exports = {
  findByEmail,
  create,
};
