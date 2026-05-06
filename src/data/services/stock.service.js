const { InventoryMovement } = require("../models");
const sequelize = require("../sequelize");

function normalizeStockValue(value) {
  if (value === null || value === undefined) {
    return 0;
  }

  return Number(value);
}

async function getCurrentStockByProductId(productId) {
  const rows = await InventoryMovement.findAll({
    attributes: [
      "product_id",
      [
        sequelize.literal(
          "SUM(CASE WHEN type = 'entry' THEN quantity ELSE -quantity END)"
        ),
        "stock",
      ],
    ],
    where: { productId },
    group: ["product_id"],
    raw: true,
  });

  if (rows.length === 0) {
    return 0;
  }

  return normalizeStockValue(rows[0].stock);
}

async function getCurrentStockAll() {
  const rows = await InventoryMovement.findAll({
    attributes: [
      "product_id",
      [
        sequelize.literal(
          "SUM(CASE WHEN type = 'entry' THEN quantity ELSE -quantity END)"
        ),
        "stock",
      ],
    ],
    group: ["product_id"],
    raw: true,
  });

  return rows.map((row) => ({
    productId: row.product_id,
    stock: normalizeStockValue(row.stock),
  }));
}

module.exports = {
  getCurrentStockByProductId,
  getCurrentStockAll,
};
