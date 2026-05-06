const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash("admin123", 10);
    const userHash = await bcrypt.hash("user123", 10);

    await queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@smartstock.local",
        password: passwordHash,
        role: "admin",
        settings: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Usuario",
        email: "user@smartstock.local",
        password: userHash,
        role: "user",
        settings: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
