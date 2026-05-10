const express = require("express");
const stockController = require("../controllers/stock.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");
const asyncHandler = require("../../shared/utils/asyncHandler");

const router = express.Router();

router.get("/current", authenticateToken, asyncHandler(stockController.getCurrentStock));
router.get(
	"/movements",
	authenticateToken,
	requireRole("admin"),
	asyncHandler(stockController.getMovements)
);
router.post(
	"/movement",
	authenticateToken,
	requireRole("admin"),
	asyncHandler(stockController.createMovement)
);

module.exports = router;
