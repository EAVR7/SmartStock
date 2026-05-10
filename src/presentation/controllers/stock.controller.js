const movementRepository = require("../../data/repositories/movement.repository");
const stockService = require("../../data/services/stock.service");

function toDbMovementType(value) {
  if (!value) return null;
  const normalized = String(value).toLowerCase();
  if (normalized === "entry" || normalized === "entrada") return "entry";
  if (normalized === "exit" || normalized === "salida") return "exit";
  return null;
}

function toUiMovementType(value) {
  if (!value) return null;
  return value === "entry" ? "entrada" : "salida";
}

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

async function getCurrentStock(req, res) {
  const stats = await stockService.getDashboardStats();
  res.json(stats);
}

async function getMovements(req, res) {
  const movements = await movementRepository.findAllWithProduct();
  const normalized = movements.map((mov) => ({
    id: mov.id,
    productId: mov.productId,
    type: toUiMovementType(mov.type),
    quantity: mov.quantity,
    reason: mov.reason,
    date: mov.date,
    createdAt: mov.createdAt,
    updatedAt: mov.updatedAt,
    product: mov.Product
      ? {
          id: mov.Product.id,
          name: mov.Product.name,
          sku: mov.Product.sku,
        }
      : null,
  }));

  res.json(normalized);
}

async function createMovement(req, res) {
  const productId = Number(req.body?.productId);
  const quantity = Number(req.body?.quantity);
  const type = toDbMovementType(req.body?.type);
  const reason = req.body?.reason ? String(req.body.reason).trim() : null;
  const date = req.body?.date ? String(req.body.date) : todayISODate();

  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ message: "Producto inválido." });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "La cantidad debe ser un entero positivo." });
  }

  if (!type) {
    return res.status(400).json({ message: "Tipo de movimiento inválido." });
  }

  if (type === "exit") {
    const currentStock = await stockService.getCurrentStockByProductId(productId);
    if (quantity > currentStock) {
      return res.status(400).json({
        message: "Stock insuficiente para realizar la salida.",
      });
    }
  }

  const movement = await movementRepository.create({
    productId,
    quantity,
    type,
    reason,
    date,
  });

  res.status(201).json({
    id: movement.id,
    productId: movement.productId,
    type: toUiMovementType(movement.type),
    quantity: movement.quantity,
    reason: movement.reason,
    date: movement.date,
    createdAt: movement.createdAt,
  });
}

module.exports = {
  getCurrentStock,
  getMovements,
  createMovement,
};
