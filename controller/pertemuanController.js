const { Pertemuan } = require('../models');

// async function createPertemuan({ namaPertemuan, jenisPertemuan, tanggal }) {
//   return await Pertemuan.create({
//     namaPertemuan,
//     jenisPertemuan,
//     tanggal
//   });
// }

// module.exports = {
//   createPertemuan
// };


const createPertemuan = async (req, res) => {
    const { namaPertemuan, jenisPertemuan, tanggal } =req.body;

    try {
        console.log('Request Body:', req.body);

        const newPertemuan = await Pertemuan.create({
            namaPertemuan,
            jenisPertemuan,
            tanggal
        });
        console.log("New Pertemuan Created:", newPertemuan);

        res.redirect('admin/dashboard');
    } catch (error) {
        console.error('Error creating new pertemuan:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
};

module.exports = { createPertemuan };