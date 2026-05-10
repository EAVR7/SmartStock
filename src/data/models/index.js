const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = require("./user.model")(sequelize, DataTypes);
const Category = require("./category.model")(sequelize, DataTypes);
const Product = require("./product.model")(sequelize, DataTypes);
const InventoryMovement = require("./movement.model")(sequelize, DataTypes);

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

Product.hasMany(InventoryMovement, { foreignKey: "productId" });
InventoryMovement.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  InventoryMovement,
};
