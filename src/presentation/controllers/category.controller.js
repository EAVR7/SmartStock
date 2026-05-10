const categoryRepository = require("../../data/repositories/category.repository");

async function listAll(req, res) {
  const categories = await categoryRepository.listAll();
  res.json(categories);
}

async function getById(req, res) {
  const { id } = req.params;
  const category = await categoryRepository.findById(id);
  if (!category) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }
  res.json(category);
}

async function create(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  const existing = await categoryRepository.findByName(name);
  if (existing) {
    return res.status(400).json({ message: "La categoría ya existe" });
  }

  const category = await categoryRepository.create({ name });
  res.status(201).json(category);
}

async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  const category = await categoryRepository.update(id, { name });
  if (!category) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }

  res.json(category);
}

async function remove(req, res) {
  const { id } = req.params;
  const success = await categoryRepository.remove(id);
  if (!success) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }
  res.json({ message: "Categoría eliminada" });
}

module.exports = {
  listAll,
  getById,
  create,
  update,
  remove,
};
