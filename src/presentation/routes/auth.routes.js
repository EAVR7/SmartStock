const express = require("express");
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const asyncHandler = require("../../shared/utils/asyncHandler");

const router = express.Router();

router.post("/login", asyncHandler(authController.login));
router.get("/me", authenticateToken, asyncHandler(authController.me));

module.exports = router;
