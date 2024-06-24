const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/validTokenMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const admin = require('../controller/admin');
const { register, upload } = require('../controller/registerController');
const pertemuan = require('../controller/pertemuanController');
const PresensiPiket = require('../models/presensiPiket');

router.post('/daftarAkun', upload.single('profilePhoto'), register);
router.post('/pertemuan', pertemuan.createPertemuan);

router.get('/daftarAkun', verifyToken, checkRole("admin"), (req, res) => {
    res.render("admin/daftarAkun", { title: "Admin Daftar Akun" });
});

router.get('/pertemuan', verifyToken, checkRole("admin"), (req, res) => {
    res.render("admin/pertemuan", { title: "Admin Pertemuan Baru" });
});

router.get('/ubahPassword', verifyToken, checkRole("admin"), (req, res) => {
    res.render("admin/ubahPassword", { title: "Admin Ubah Password" });
});

router.get('/laporanPertemuan', verifyToken, checkRole("admin"), (req, res) => {
    res.render("admin/laporanPertemuan", { title: "Admin Laporan Pertemuan" });
});

router.get('/dashboard', verifyToken, checkRole('admin'), admin.getDashboardData);

router.get('/dashboard', verifyToken, checkRole("admin"), (req, res) => {
    res.render("admin/dashboard", { title: "Admin Dashboard" });
});

router.get('/sidebar', verifyToken, checkRole("admin"), (req, res) => {
    res.render('sidebar');
});

router.get('/akun', verifyToken, checkRole("admin"), admin.getData);

router.get('/anggota', verifyToken, checkRole("admin"), admin.getUsers);

router.get('/listpertemuan', verifyToken, checkRole('admin'), pertemuan.listPertemuan);
router.get('/editPertemuan/:id', verifyToken, checkRole("admin"), pertemuan.editPertemuan);
router.post('/update/:id', verifyToken, checkRole("admin"), pertemuan.updatePertemuan);
router.get('/delete/:id', verifyToken, checkRole("admin"), pertemuan.deletePertemuan);

router.get('/akun/ubahPassword', verifyToken, checkRole('admin'), (req, res) => {
    const { userId, userRole, userEmail, userNama } = req.user; // Assuming req.user is populated by your authentication middleware
    res.render('admin/ubahPassword', { userId, userRole, userEmail, userNama });
});

router.post('/akun/change-password', verifyToken, checkRole('admin'), async (req, res) => {
    try {
        await admin.changePassword(req, res);
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Error changing password" });
    }
});

router.get('/presensiPiketDetails', (req, res) => {
    res.render('admin/presensiPiketDetails', { title: 'Admin Pertemuan' });
});

module.exports = router;
