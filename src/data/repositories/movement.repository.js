const { InventoryMovement, Product } = require("../models");

async function create(data) {
  return InventoryMovement.create(data);
}

async function findByProductId(productId) {
  return InventoryMovement.findAll({
    where: { productId },
    order: [["date", "DESC"]],
  });
}

async function findAllWithProduct() {
  return InventoryMovement.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "name", "sku"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}

module.exports = {
  create,
  findByProductId,
  findAllWithProduct,
};
