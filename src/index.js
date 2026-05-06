const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./presentation/routes/product.routes");
const stockRoutes = require("./presentation/routes/stock.routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Smart Stock listening on port ${port}`);
});
