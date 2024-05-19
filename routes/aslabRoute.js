var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/validTokenMiddleware');
const role= require ('../middleware/checkRoleMiddleware');
const { changePassword }= require ('../controller/authController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/aslab/home', verifyToken, checkRole("aslab"), function(req, res) {// akses data
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userRole = req.userRole;

  res.render('aslab/home', { userId,userEmail,userName,userRole });//akses front end
});


router.get('/aslab/akun', verifyToken, function(req, res, next) {
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userRole = req.userRole;

  res.render('aslab/akun', { userId,userEmail,userName,userRole  });
});


router.get('/aslab/ubahPassword',verifyToken, function(req, res, next) {
  const userId = req.userId;
  const userEmail = req.userEmail;
  const userName = req.userName;
  const userRole = req.userRole;

  res.render('aslab/ubahPassword', { userId,userEmail,userName,userRole  });
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
