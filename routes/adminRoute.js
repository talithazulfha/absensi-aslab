var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validTokenMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/dashboard', verifyToken, checkRole("admin"), function (req, res, next) {
  res.render("admin/dashboard", { title: "Admin Dashboard" });
});

router.get('/akun', verifyToken, function (req, res, next) {
  res.render("admin/akun", { title: "Admin Akun" });
});

router.get('/anggota', verifyToken, function (req, res, next) {
  res.render("./admin/anggota", { title: "anggota" });
});

router.get('/daftarAkun', verifyToken, function (req, res, next) {
  res.render("admin/daftarAkun", { title: "Admin Daftar Akun" });
});

router.get('/pertemuan', function(req, res, next) {
    res.render('admin/pertemuan', { title: 'Admin Pertemuan' });
});

router.get('/laporanPertemuan', function(req, res, next) {
    res.render('admin/laporanPertemuan', { title: 'Admin Laporan Pertemuan' });
});


module.exports = router;




