const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/validTokenMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const admin = require('../controller/admin');
const registerController = require('../controller/registerController');
const pertemuan = require('../controller/pertemuanController');

router.post('/daftarAkun', registerController.register);

router.post('/pertemuan', pertemuan.createPertemuan);

router.get('/daftarAkun', verifyToken, checkRole("admin"), (req, res) => {
    res.render("admin/daftarAkun", { title: "Admin Daftar Akun" });
});

router.get('/pertemuan', verifyToken, checkRole("admin"), (req, res) => {
    res.render("admin/pertemuan", { title: "Admin Pertemuan Baru" });
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

router.get('/akun', verifyToken, (req, res) => {
    const { userId, userRole, userEmail, userNama } = req;
    res.render('admin/akun', { userId, userRole, userEmail, userNama });
});

router.get('/anggota', verifyToken, checkRole("admin"), admin.getUsers);

router.get('/listpertemuan', verifyToken, checkRole('admin'), pertemuan.listPertemuan);

router.get('/editPertemuan/:id', verifyToken, checkRole("admin"), pertemuan.editPertemuan);

router.post('/update/:id', verifyToken, checkRole("admin"), pertemuan.updatePertemuan);

router.get('/delete/:id', verifyToken, checkRole("admin"), pertemuan.deletePertemuan);

module.exports = router;
