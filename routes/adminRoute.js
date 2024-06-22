const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/validTokenMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const admin = require('../controller/admin');
const registerController = require('../controller/registerController');

router.post('/daftarAkun', registerController.register);

router.get('/dashboard', verifyToken, checkRole("admin"), (req, res) => {
  res.render("admin/dashboard", { title: "Admin Dashboard" });
});

router.get('/akun', verifyToken, (req, res) => {
  const { userId, userRole, userEmail, userNama } = req;
  res.render('admin/akun', { userId, userRole, userEmail, userNama });
});

// router.get('/anggota', verifyToken, (req, res) => {
//   const { userId, userRole, userEmail, userNama } = req;
//   res.render("./admin/anggota", { userId, userRole, userEmail, userNama });
// });

router.get('/anggota', verifyToken, checkRole("admin"), admin.getUsers);

router.get('/daftarAkun', verifyToken, (req, res) => {
  res.render("admin/daftarAkun", { title: "Admin Daftar Akun" });
});

router.get('/pertemuan', (req, res) => {
  res.render('admin/pertemuan', { title: 'Admin Pertemuan' });
});

router.get('/laporanPertemuan', (req, res) => {
  res.render('admin/laporanPertemuan', { title: 'Admin Laporan Pertemuan' });
});

module.exports = router;
