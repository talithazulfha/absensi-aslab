var express = require('express');
var router = express.Router();
const controller = require('../controller/authController');
const verifyToken = require('../middleware/validTokenMiddleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Sign In SILAB' });
});

router.get('/login', controller.form);
router.post('/login', controller.checklogin);

router.post('/logout', verifyToken,controller.logout);
module.exports = router;



module.exports = router;
