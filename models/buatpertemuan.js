'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuatPertemuan extends Model {

    static associate(models) {

      BuatPertemuan.belongsTo(models.User, { 
        foreignKey: 'userId' 
      });
      BuatPertemuan.belongsTo(models.Pertemuan, { 
        foreignKey: 'pertemuanId' 
      });
    }
  }
  BuatPertemuan.init({
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
      model: 'Users',
      key: 'id',
    }
  },
  pertemuanId: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: 'Pertemuans',
      key: 'id',
    }
  },
  status: {
    type: DataTypes.ENUM('hadir', 'izin', 'sakit', 'tanpa keterangan'),
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.STRING,
    allowNull: true,
  }
  }, {
    sequelize,
    modelName: 'BuatPertemuan',
  });
  return BuatPertemuan;
};