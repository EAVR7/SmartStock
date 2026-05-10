const express = require("express");
const reportController = require("../controllers/report.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");
const asyncHandler = require("../../shared/utils/asyncHandler");

const router = express.Router();

router.get(
  "/products",
  authenticateToken,
  requireRole("admin"),
  asyncHandler(reportController.exportProductsPdf)
);

module.exports = router;
