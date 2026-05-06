module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Bebidas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Snacks",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Limpieza",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
