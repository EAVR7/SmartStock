const express = require("express");
const settingsController = require("../controllers/settings.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const asyncHandler = require("../../shared/utils/asyncHandler");

const router = express.Router();

router.use(authenticateToken);

router.get("/", asyncHandler(settingsController.getSettings));
router.post("/", asyncHandler(settingsController.updateSettings));

module.exports = router;
