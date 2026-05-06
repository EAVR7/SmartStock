module.exports = {
  async up(queryInterface, Sequelize) {
    const [categories] = await queryInterface.sequelize.query(
      'SELECT id, name FROM categories ORDER BY id ASC;'
    );

    const findCategoryId = (name) => {
      const category = categories.find((row) => row.name === name);
      return category ? category.id : null;
    };

    await queryInterface.bulkInsert("products", [
      {
        name: "Agua 600ml",
        description: "Botella de agua sin gas",
        sku: "BEB-001",
        category_id: findCategoryId("Bebidas"),
        image_url: null,
        price: 1.25,
        stock_minimo: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Galletas",
        description: "Paquete de galletas surtidas",
        sku: "SNA-001",
        category_id: findCategoryId("Snacks"),
        image_url: null,
        price: 2.5,
        stock_minimo: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Detergente",
        description: "Detergente liquido 1L",
        sku: "LIM-001",
        category_id: findCategoryId("Limpieza"),
        image_url: null,
        price: 4.75,
        stock_minimo: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
