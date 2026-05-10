const express = require("express");
const productController = require("../controllers/product.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");
const asyncHandler = require("../../shared/utils/asyncHandler");

const router = express.Router();

router.get("/", authenticateToken, asyncHandler(productController.listProducts));
router.get("/:id", authenticateToken, asyncHandler(productController.getProduct));
router.post(
	"/",
	authenticateToken,
	requireRole("admin"),
	asyncHandler(productController.createProduct)
);
router.put(
	"/:id",
	authenticateToken,
	requireRole("admin"),
	asyncHandler(productController.updateProduct)
);
router.delete(
	"/:id",
	authenticateToken,
	requireRole("admin"),
	asyncHandler(productController.deleteProduct)
);

module.exports = router;
