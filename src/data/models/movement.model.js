module.exports = (sequelize, DataTypes) => {
  const Movement = sequelize.define(
    "InventoryMovement",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_id",
      },
      type: {
        type: DataTypes.ENUM("entry", "exit"),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          isInt: true,
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "inventory_movements",
      underscored: true,
      timestamps: true,
    }
  );

  return Movement;
};
