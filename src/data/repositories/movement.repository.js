const { InventoryMovement } = require("../models");

async function create(data) {
  return InventoryMovement.create(data);
}

async function findByProductId(productId) {
  return InventoryMovement.findAll({
    where: { productId },
    order: [["date", "DESC"]],
  });
}

module.exports = {
  create,
  findByProductId,
};
