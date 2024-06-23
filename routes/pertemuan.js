const express = require('express');
const router = express.Router();
const { Pertemuan } = require('../models');

// Route to create a new Pertemuan
router.post('/', async (req, res) => {
  try {
    const { namaPertemuan, jenisPertemuan, tanggal } = req.body;

    const newPertemuan = await Pertemuan.create({
      namaPertemuan,
      jenisPertemuan,
      tanggal
    });

    res.status(201).json(newPertemuan);
  } catch (error) {
    console.error('Error creating pertemuan:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

module.exports = router;
