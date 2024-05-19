var express = require('express');
var router = express.Router();
const controller = require('../controller/authController');
const verifyToken= require ('../middleware/validTokenMiddleware');

router.get('/', function(req, res) {
    res.redirect('/login');
  });
  
router.get('/login', controller.form);
router.post('/login', controller.checklogin);

router.post('/logout', verifyToken,controller.logout);
module.exports = router;
