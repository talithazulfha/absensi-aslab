var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/validTokenMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get("/home", verifyToken, checkRole("aslab"), function (req, res) {
  const { userId, userRole, userEmail, userNama } = req;
  res.render('aslab/home', { userId, userRole, userEmail, userNama });
});

router.get('/akun', verifyToken, (req, res) => {
  const { userId, userRole, userEmail, userNama } = req;
  res.render('aslab/akun', { userId, userRole, userEmail, userNama });
});

router.get("/ubahPassword", verifyToken, checkRole("aslab"), function (req, res) {
  res.render("aslab/ubahPassword", { title: "Ubah Password" });
});

router.get("/jadwalPiket", verifyToken, checkRole("aslab"), function (req, res) {
  res.render("aslab/jadwalPiket", { title: "Jadwal Piket" });
});

module.exports = router;

