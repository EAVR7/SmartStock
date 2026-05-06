const express = require("express");
const stockController = require("../controllers/stock.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/current", authenticateToken, stockController.getCurrentStock);
router.post("/movement", authenticateToken, requireRole("admin"), stockController.createMovement);

module.exports = router;
