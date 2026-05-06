const PDFDocument = require("pdfkit");
const productRepository = require("../../data/repositories/product.repository");
const stockService = require("../../data/services/stock.service");

function buildStockMap(stockRows) {
  const map = new Map();
  stockRows.forEach((row) => {
    map.set(Number(row.productId), Number(row.stock));
  });
  return map;
}

function formatMoney(value) {
  if (value === null || value === undefined) {
    return "-";
  }

  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return "-";
  }

  return numberValue.toFixed(2);
}

async function exportProductsPdf(req, res) {
  const products = await productRepository.findAll();
  const stockRows = await stockService.getCurrentStockAll();
  const stockMap = buildStockMap(stockRows);

  const doc = new PDFDocument({ margin: 40, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=smartstock-products.pdf");

  doc.pipe(res);

  doc.fontSize(18).text("Smart Stock - Reporte de Productos", { align: "left" });
  doc.moveDown(0.5);
  doc.fontSize(10).text(`Generado: ${new Date().toLocaleString()}`);
  doc.moveDown(1);

  const header = ["SKU", "Nombre", "Categoria", "Precio", "Stock", "Minimo"];
  doc.fontSize(11).text(header.join(" | "));
  doc.moveDown(0.3);
  doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.4);

  products.forEach((product) => {
    const stock = stockMap.get(product.id) || 0;
    const line = [
      product.sku,
      product.name,
      product.categoryId ? String(product.categoryId) : "-",
      formatMoney(product.price),
      String(stock),
      product.stockMinimo ? String(product.stockMinimo) : "-",
    ];

    doc.fontSize(10).text(line.join(" | "));
  });

  doc.end();
}

module.exports = {
  exportProductsPdf,
};
