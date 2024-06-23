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

router.get('/ubahPassword', verifyToken, (req, res) => {
  const { userId, userRole, userEmail, userNama } = req;
  res.render('aslab/ubahPassword', { userId, userRole, userEmail, userNama });
});

router.post('/change-password', verifyToken, async (req, res) => {
  try {
      await changePassword(req, res);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

module.exports = router;

