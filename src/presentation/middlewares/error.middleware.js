function notFound(req, res) {
  return res.status(404).json({ message: "Recurso no encontrado." });
}

function errorHandler(err, req, res, next) {
  const statusCode = Number(err?.statusCode) || 500;

  // Sequelize
  if (err?.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Ya existe un registro con ese valor (por ejemplo, SKU o email).",
    });
  }

  if (err?.name === "SequelizeValidationError") {
    const first = err?.errors?.[0];
    return res.status(400).json({
      message: first?.message || "Datos inválidos.",
    });
  }

  if (err?.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      message: "Referencia inválida (por ejemplo, categoría o producto inexistente).",
    });
  }

  const message =
    err?.message ||
    (statusCode >= 500
      ? "Error interno del servidor."
      : "Ocurrió un error.");

  return res.status(statusCode).json({ message });
}

module.exports = {
  notFound,
  errorHandler,
};
