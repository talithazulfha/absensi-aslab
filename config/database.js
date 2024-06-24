const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_tb_pweb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
