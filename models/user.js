'use strict';

const sequelize = require('../config/database');
const {
  Model
} = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  class User extends Model {
   
    static associate(models) {
    
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
    },
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true
  }
    
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};