module.exports = {
  async up(queryInterface) {
    const [products] = await queryInterface.sequelize.query(
      'SELECT id, sku FROM products ORDER BY id ASC;'
    );

    const findProductId = (sku) => {
      const product = products.find((row) => row.sku === sku);
      return product ? product.id : null;
    };

    await queryInterface.bulkInsert("inventory_movements", [
      {
        product_id: findProductId("BEB-001"),
        type: "entry",
        quantity: 100,
        date: new Date(),
        reason: "compra",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: findProductId("SNA-001"),
        type: "entry",
        quantity: 60,
        date: new Date(),
        reason: "compra",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: findProductId("LIM-001"),
        type: "entry",
        quantity: 40,
        date: new Date(),
        reason: "compra",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: findProductId("BEB-001"),
        type: "exit",
        quantity: 10,
        date: new Date(),
        reason: "venta",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("inventory_movements", null, {});
  },
};
