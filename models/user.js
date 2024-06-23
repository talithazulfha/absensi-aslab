'use strict';

const sequelize = require('../config/database');
const {
  Model
} = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Pertemuan, { through: models.BuatPertemuan, foreignKey: 'userId' });
    }
  }
  User.init({
    id: {
      type : DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    namaAnggota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noHp: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};