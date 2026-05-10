const express = require("express");
const categoryController = require("../controllers/category.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");
const asyncHandler = require("../../shared/utils/asyncHandler");

const router = express.Router();

router.use(authenticateToken);

router.get("/", asyncHandler(categoryController.listAll));
router.get("/:id", asyncHandler(categoryController.getById));

// Only admin can manage categories
router.post("/", requireRole('admin'), asyncHandler(categoryController.create));
router.put("/:id", requireRole('admin'), asyncHandler(categoryController.update));
router.delete("/:id", requireRole('admin'), asyncHandler(categoryController.remove));

module.exports = router;
