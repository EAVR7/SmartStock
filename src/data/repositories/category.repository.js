const { Category } = require("../models");

async function listAll() {
  return Category.findAll({
    order: [["name", "ASC"]],
  });
}

async function findById(id) {
  return Category.findByPk(id);
}

async function findByName(name) {
  return Category.findOne({ where: { name } });
}

async function create(data) {
  return Category.create(data);
}

async function update(id, data) {
  const category = await Category.findByPk(id);
  if (!category) return null;
  return category.update(data);
}

async function remove(id) {
  const category = await Category.findByPk(id);
  if (!category) return false;
  await category.destroy();
  return true;
}

module.exports = {
  listAll,
  findById,
  findByName,
  create,
  update,
  remove,
};