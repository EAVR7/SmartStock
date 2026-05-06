const express = require("express");
const reportController = require("../controllers/report.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/products",
  authenticateToken,
  requireRole("admin"),
  reportController.exportProductsPdf
);

module.exports = router;
