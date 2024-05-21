var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validTokenMiddleware');
const role= require ('../middleware/checkRoleMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/dashboard', verifyToken, checkRole("admin"), function(req, res, next) {
  // menampilkan data admin
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userRole = req.userRole;

  res.render('admin/dashboard', { userId,userEmail,userName, userRole });
});

router.get('/akun', verifyToken, function(req, res, next) {
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userRole = req.userRole;

  res.render('admin/akun', { userId,userEmail,userName,userRole });
});

router.get('/anggota', verifyToken, function(req, res, next) {
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userRole = req.userRole;

  res.render('admin/anggota', { userId,userEmail,userName,userRole });
});

router.get('/daftarAkun', verifyToken, function(req, res, next) {
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userRole = req.userRole;

  res.render('admin/daftarAkun', { userId,userEmail,userName,userRole });
});


module.exports = router;
