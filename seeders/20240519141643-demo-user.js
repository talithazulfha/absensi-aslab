const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      email: 'talitha@gmail.com',
      name: 'talitha',
      password: await bcrypt.hash('talitha',10),
      role:'aslab',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'admin@gmail.com',
      name: 'admin',
      password: await bcrypt.hash('admin',10),
      role:'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
     }
 
 
 ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
