'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PresensiPiket extends Model {
    static associate(models) {
      PresensiPiket.belongsTo(models.User, { foreignKey: 'no_anggota' });
    }
  }
  PresensiPiket.init({
    id_presensi: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    no_anggota: DataTypes.STRING,
    nama_anggota: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    jam_masuk: DataTypes.TIME,
    jam_keluar: DataTypes.TIME,
    status: DataTypes.ENUM('active', 'inactive'),
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PresensiPiket',
  });
  return PresensiPiket;
};
