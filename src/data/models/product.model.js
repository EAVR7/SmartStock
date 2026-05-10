module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "category_id",
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "image_url",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      stockMinimo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "stock_minimo",
        validate: {
          min: 0,
          isInt: true,
        },
      },
    },
    {
      tableName: "products",
      underscored: true,
      timestamps: true,
    }
  );

  return Product;
};
