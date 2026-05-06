const { Product } = require("../models");

async function findAll() {
  return Product.findAll();
}

async function findById(id) {
  return Product.findByPk(id);
}

async function create(data) {
  return Product.create(data);
}

async function update(id, data) {
  const product = await Product.findByPk(id);
  if (!product) {
    return null;
  }

  return product.update(data);
}

async function remove(id) {
  const product = await Product.findByPk(id);
  if (!product) {
    return null;
  }

  await product.destroy();
  return product;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
