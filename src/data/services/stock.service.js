const { InventoryMovement, Product } = require("../models");
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
  getDashboardStats,
};

function buildStockMap(stockRows) {
  const map = new Map();
  stockRows.forEach((row) => {
    map.set(Number(row.productId), normalizeStockValue(row.stock));
  });
  return map;
}

function normalizeMoney(value) {
  if (value === null || value === undefined) {
    return 0;
  }
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return 0;
  }
  return numberValue;
}

async function getDashboardStats() {
  const [products, stockRows, totalMovements] = await Promise.all([
    Product.findAll({
      attributes: ["id", "price", "stockMinimo"],
      raw: true,
    }),
    getCurrentStockAll(),
    InventoryMovement.count(),
  ]);

  const stockMap = buildStockMap(stockRows);

  const totalProducts = products.length;
  let lowStockProducts = 0;
  let totalValue = 0;

  products.forEach((product) => {
    const currentStock = stockMap.get(product.id) || 0;
    const minimumStock = product.stockMinimo;

    if (minimumStock !== null && minimumStock !== undefined) {
      if (currentStock <= Number(minimumStock)) {
        lowStockProducts += 1;
      }
    }

    totalValue += currentStock * normalizeMoney(product.price);
  });

  return {
    totalProducts,
    lowStockProducts,
    totalValue,
    totalMovements,
  };
}
