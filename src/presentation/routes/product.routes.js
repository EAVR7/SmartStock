const express = require("express");
const productController = require("../controllers/product.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, productController.listProducts);
router.get("/:id", authenticateToken, productController.getProduct);
router.post("/", authenticateToken, requireRole("admin"), productController.createProduct);
router.put("/:id", authenticateToken, requireRole("admin"), productController.updateProduct);
router.delete("/:id", authenticateToken, requireRole("admin"), productController.deleteProduct);

module.exports = router;
