const express = require("express");
const stockController = require("../controllers/stock.controller");

const router = express.Router();

router.get("/current", stockController.getCurrentStock);
router.post("/movement", stockController.createMovement);

module.exports = router;
