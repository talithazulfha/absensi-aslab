'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pertemuans', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      namaPertemuan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jenisPertemuan: {
        allowNull: false,
        type: Sequelize.ENUM('rapat', 'upgrading', 'goro', 'lainnya')
      },
      tanggal: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pertemuans');
  }
};