const express = require("express");
const adminController = require("../controllers/admin.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticateToken, requireRole("admin"));

router.get("/users", adminController.listUsers);
router.post("/users", adminController.createUser);

module.exports = router;
