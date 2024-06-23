'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pertemuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pertemuan.belongsToMany(models.User, { through: models.BuatPertemuan, foreignKey: 'pertemuanId' });
    }
  }
  Pertemuan.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    namaPertemuan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenisPertemuan: {
      type: DataTypes.ENUM('rapat', 'upgrading', 'goro', 'lainnya'),
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Pertemuan',
    hooks: {
      beforeCreate: async (pertemuan, options) => {
        const latestPertemuan = await Pertemuan.findOne({
          order: [['createdAt', 'DESC']]
        });

        let newId = 'PRT001';
        if (latestPertemuan) {
          const latestId = latestPertemuan.id;
          const idNumber = parseInt(latestId.replace('PRT', '')) + 1;
          newId = 'PRT' + idNumber.toString().padStart(3, '0');
        }
        pertemuan.id = newId;
      }
    }
  });
  return Pertemuan;
};