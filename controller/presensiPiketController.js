const { PresensiPiket, User } = require('../models');


exports.createPresensiPiket = async (req, res) => {
    try {
      const { id_presensi, no_anggota, hari, tanggal, jam_masuk, jam_keluar, status, keterangan } = req.body;
      console.log('Data yang diterima:', req.body); // Tambahkan ini untuk memeriksa data yang diterima
      if (!id_presensi || !no_anggota || !hari || !tanggal || !jam_masuk || !jam_keluar || !status) {
        return res.status(400).json({ error: 'Semua field harus diisi' });
      }
      const newPresensiPiket = await PresensiPiket.create({ id_presensi, no_anggota, hari, tanggal, jam_masuk, jam_keluar, status, keterangan });
      res.status(201).json(newPresensiPiket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


exports.updatePresensiPiket = async (req, res) => {
  try {
    const { id } = req.params;
    const { no_anggota, hari, tanggal, jam_masuk, jam_keluar, status, keterangan } = req.body;
    const presensiPiket = await PresensiPiket.findByPk(id);
    if (!presensiPiket) {
      return res.status(404).json({ message: 'Presensi Piket not found' });
    }
    presensiPiket.no_anggota = no_anggota;
    presensiPiket.hari = hari;
    presensiPiket.tanggal = tanggal;
    presensiPiket.jam_masuk = jam_masuk;
    presensiPiket.jam_keluar = jam_keluar;
    presensiPiket.status = status;
    presensiPiket.keterangan = keterangan;
    await presensiPiket.save();
    res.status(200).json(presensiPiket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deletePresensiPiket = async (req, res) => {
  try {
    const { id } = req.params;
    const presensiPiket = await PresensiPiket.findByPk(id);
    if (!presensiPiket) {
      return res.status(404).json({ message: 'Presensi Piket not found' });
    }
    await presensiPiket.destroy();
    res.status(204).json({ message: 'Presensi Piket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
