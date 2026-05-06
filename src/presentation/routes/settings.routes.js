const express = require("express");
const settingsController = require("../controllers/settings.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticateToken);

router.get("/", settingsController.getSettings);
router.post("/", settingsController.updateSettings);

module.exports = router;
