const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = require("./user.model")(sequelize, DataTypes);
const Category = require("./category.model")(sequelize, DataTypes);
const Product = require("./product.model")(sequelize, DataTypes);
const InventoryMovement = require("./movement.model")(sequelize, DataTypes);

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

Product.hasMany(InventoryMovement, { foreignKey: "product_id" });
InventoryMovement.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  InventoryMovement,
};
