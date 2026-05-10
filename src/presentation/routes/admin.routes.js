const express = require("express");
const adminController = require("../controllers/admin.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");
const asyncHandler = require("../../shared/utils/asyncHandler");

const router = express.Router();

router.use(authenticateToken, requireRole("admin"));

router.get("/users", asyncHandler(adminController.listUsers));
router.post("/users", asyncHandler(adminController.createUser));

module.exports = router;
