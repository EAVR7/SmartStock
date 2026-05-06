const productRepository = require("../../data/repositories/product.repository");

async function listProducts(req, res) {
  const products = await productRepository.findAll();
  res.json(products);
}

async function getProduct(req, res) {
  const product = await productRepository.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
}

async function createProduct(req, res) {
  const product = await productRepository.create(req.body);
  res.status(201).json(product);
}

async function updateProduct(req, res) {
  const product = await productRepository.update(req.params.id, req.body);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
}

async function deleteProduct(req, res) {
  const product = await productRepository.remove(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json({ message: "Product deleted" });
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
