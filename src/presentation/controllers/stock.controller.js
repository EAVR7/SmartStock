const movementRepository = require("../../data/repositories/movement.repository");
const stockService = require("../../data/services/stock.service");

async function getCurrentStock(req, res) {
  const stock = await stockService.getCurrentStockAll();
  res.json(stock);
}

async function createMovement(req, res) {
  const movement = await movementRepository.create(req.body);
  res.status(201).json(movement);
}

module.exports = {
  getCurrentStock,
  createMovement,
};
