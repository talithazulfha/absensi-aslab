'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "LABSI.01.01",
          namaAnggota: "Talitha Zulfa Amirah",
          email: "email@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "aslab",
          jabatan: "koordinator asisten",
          noHp: "08123456789"
        },
        {
          id: "001",
          namaAnggota: "Admin",
          email: "email@gmail.com",
          password: await bcrypt.hash("admin", 10),
          role: "admin",
          jabatan: "amin",
          noHp: "000"
        }
      ],
      {}
    );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});

  }
};
