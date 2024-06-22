'use strict';

const sequelize = require('../config/database');
const {
  Model
} = require('sequelize');
module.exports = function(sequelize, DataTypes){
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type : DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    namaAnggota: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    noHp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};