const { PresensiPiket } = require('../models');
const jwt = require("jsonwebtoken");

const createPresensiPiket = async (req, res) => {
  const { no_anggota, nama_anggota, tanggal, jam_masuk, jam_keluar, status, keterangan } = req.body;

  try {
      console.log('Request Body:', req.body);

      const newPresensiPiket = await PresensiPiket.create({
          no_anggota,
          nama_anggota,
          tanggal,
          jam_masuk,
          jam_keluar,
          status,
          keterangan
      });

      console.log("New Presensi Piket Created:", newPresensiPiket);

      res.redirect('/admin/presensiPiketDetails');
  } catch (error) {
      console.error('Error creating presensi piket:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const listPresensiPiket = async (req, res) => {
  try {
      const listpiket = await PresensiPiket.findAll();
      res.render('admin/presensiPiketDetails', {
          title: 'Presensi Piket',
          listpiket
      });
  } catch (error) {
      console.error('Error fetching presensi piket:', error);
      res.status(500).json({ message: 'Terjadi kesalahan internal server. Silakan coba lagi nanti.' });
  }
};

const editPresensiPiket = async (req, res) => {
  const { id } = req.params;
  try {
      const piket = await PresensiPiket.findByPk(id);
      if (!piket) {
        return res.status(404).json({ message: "presensi piket not found" });
    }
  } catch (error) {
    console.error("Error fetching presensi piket for edit:", error);
    res.status(500).json({ message: "Internal server error" });
}
};

const updatePresensiPiket = async (req, res) => {
  const { id } = req.params;
  const { tanggal, jam_masuk, jam_keluar, status, keterangan } = req.body;
  
  try {
      const updatepresensi = await PresensiPiket.findByPk(id);
      if (!updatepresensi) {
          return res.status(404).json({ message: "Presensi piket not found" });
      }

      await updatepresensi.update({
          tanggal,
          jam_masuk,
          jam_keluar,
          status,
          keterangan
      });

      res.redirect('/admin/presensiPiketDetails');
  } catch (error) {
      console.error("Error updating presensi piket:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

const deletePresensiPiket = async (req, res) => {
  const { id } = req.params;
  try {
      const piket = await PresensiPiket.findByPk(id);
      if (!piket) {
          return res.status(404).json({ message: "Presensi piket not found" });
      }

      await piket.destroy();
      res.redirect('/admin/presensiPiketDetails');
  } catch (error) {
      console.error("Error deleting presensi piket:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { 
  createPresensiPiket,
  listPresensiPiket,
  editPresensiPiket,
  updatePresensiPiket,
  deletePresensiPiket };

