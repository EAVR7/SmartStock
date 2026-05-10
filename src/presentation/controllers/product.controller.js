const productRepository = require("../../data/repositories/product.repository");
const stockService = require("../../data/services/stock.service");

function normalizePrice(value) {
  if (value === null || value === undefined) return null;
  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? null : numberValue;
}

function normalizeProductForUi(product, currentStock) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    sku: product.sku,
    categoryId: product.categoryId ?? null,
    imageUrl: product.imageUrl ?? null,
    price: normalizePrice(product.price) ?? 0,
    currentStock: currentStock ?? 0,
    minimumStock: product.stockMinimo ?? null,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function parseNonNegativeNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return NaN;
  return numberValue;
}

async function listProducts(req, res) {
  const [products, stockRows] = await Promise.all([
    productRepository.findAll(),
    stockService.getCurrentStockAll(),
  ]);

  const stockMap = new Map();
  stockRows.forEach((row) => {
    stockMap.set(Number(row.productId), Number(row.stock));
  });

  const normalized = products.map((product) =>
    normalizeProductForUi(product, stockMap.get(product.id) || 0)
  );

  res.json(normalized);
}

async function getProduct(req, res) {
  const product = await productRepository.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado." });
  }

  const currentStock = await stockService.getCurrentStockByProductId(product.id);
  return res.json(normalizeProductForUi(product, currentStock));
}

async function createProduct(req, res) {
  const price = parseNonNegativeNumber(req.body?.price);
  const minimumStock = parseNonNegativeNumber(req.body?.minimumStock ?? req.body?.stockMinimo);

  if (Number.isNaN(price) || price < 0) {
    return res.status(400).json({ message: "El precio no puede ser negativo." });
  }

  if (Number.isNaN(minimumStock) || (minimumStock !== null && minimumStock < 0)) {
    return res.status(400).json({ message: "El stock mínimo no puede ser negativo." });
  }

  const product = await productRepository.create({
    name: req.body?.name,
    description: req.body?.description,
    sku: req.body?.sku,
    categoryId: req.body?.categoryId || null,
    imageUrl: req.body?.imageUrl || null,
    price,
    stockMinimo: minimumStock,
  });

  res.status(201).json(normalizeProductForUi(product, 0));
}

async function updateProduct(req, res) {
  const price = parseNonNegativeNumber(req.body?.price);
  const minimumStock = parseNonNegativeNumber(req.body?.minimumStock ?? req.body?.stockMinimo);

  if (Number.isNaN(price) || price < 0) {
    return res.status(400).json({ message: "El precio no puede ser negativo." });
  }

  if (Number.isNaN(minimumStock) || (minimumStock !== null && minimumStock < 0)) {
    return res.status(400).json({ message: "El stock mínimo no puede ser negativo." });
  }

  const updateData = {};
  if (req.body?.name !== undefined) updateData.name = req.body.name;
  if (req.body?.description !== undefined)
    updateData.description = req.body.description;
  if (req.body?.sku !== undefined) updateData.sku = req.body.sku;
  if (req.body?.categoryId !== undefined) updateData.categoryId = req.body.categoryId;
  if (req.body?.imageUrl !== undefined) updateData.imageUrl = req.body.imageUrl;
  if (Object.prototype.hasOwnProperty.call(req.body, "price")) updateData.price = price;
  if (
    Object.prototype.hasOwnProperty.call(req.body, "minimumStock") ||
    Object.prototype.hasOwnProperty.call(req.body, "stockMinimo")
  ) {
    updateData.stockMinimo = minimumStock;
  }

  const product = await productRepository.update(req.params.id, updateData);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado." });
  }

  const currentStock = await stockService.getCurrentStockByProductId(product.id);
  return res.json(normalizeProductForUi(product, currentStock));
}

async function deleteProduct(req, res) {
  const product = await productRepository.remove(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado." });
  }

  return res.json({ message: "Producto eliminado." });
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
