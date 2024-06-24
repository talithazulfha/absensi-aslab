const { Pertemuan } = require('../models');
const jwt = require("jsonwebtoken");

const createPertemuan = async (req, res) => {
    const { pertemuanId, namaPertemuan, jenisPertemuan, tanggal } = req.body;

    try {
        console.log('Request Body:', req.body);

        const newPertemuan = await Pertemuan.create({
            id: pertemuanId,
            namaPertemuan,
            jenisPertemuan,
            tanggal
        });
        console.log("New Pertemuan Created:", newPertemuan);

        res.redirect('/admin/listPertemuan');
    } catch (error) {
        console.error('Error creating new pertemuan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const listPertemuan = async (req, res) => {
    try {
        const pertemuanList = await Pertemuan.findAll();
        res.render('admin/listPertemuan', { 
            title: 'Daftar Pertemuan', 
            pertemuanList 
        }); 
    } catch (error) {
        console.error('Error fetching pertemuan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan internal server. Silakan coba lagi nanti.' });
    }
};

const editPertemuan = async (req, res) => {
    const { id } = req.params;
    try {
        const pertemuan = await Pertemuan.findByPk(id);
        if (!pertemuan) {
            return res.status(404).json({ message: "Pertemuan not found" });
        }
        res.render('admin/editPertemuan', {
            title: 'Edit Pertemuan',
            pertemuan
        });
    } catch (error) {
        console.error("Error fetching pertemuan for edit:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updatePertemuan = async (req, res) => {
    const { id } = req.params;
    const { namaPertemuan, jenisPertemuan, tanggal } = req.body;
    try {
        const pertemuan = await Pertemuan.findByPk(id);
        if (!pertemuan) {
            return res.status(404).json({ message: "Pertemuan not found" });
        }
        await pertemuan.update({
            namaPertemuan,
            jenisPertemuan,
            tanggal
        });
        res.redirect('/admin/listPertemuan');
    } catch (error) {
        console.error("Error updating pertemuan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deletePertemuan = async (req, res) => {
    const { id } = req.params;
    try {
        const pertemuan = await Pertemuan.findByPk(id);
        if (!pertemuan) {
            return res.status(404).json({ message: "Pertemuan not found" });
        }
        await pertemuan.destroy();
        res.redirect('/admin/listpertemuan');
    } catch (error) {
        console.error("Error deleting pertemuan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { 
    createPertemuan, 
    listPertemuan,
    editPertemuan,
    updatePertemuan,
    deletePertemuan };
