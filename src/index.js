const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./presentation/routes/product.routes");
const stockRoutes = require("./presentation/routes/stock.routes");
const authRoutes = require("./presentation/routes/auth.routes");
const adminRoutes = require("./presentation/routes/admin.routes");
const settingsRoutes = require("./presentation/routes/settings.routes");
const reportRoutes = require("./presentation/routes/report.routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/reports", reportRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Smart Stock listening on port ${port}`);
});
