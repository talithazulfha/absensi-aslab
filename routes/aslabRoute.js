var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/validTokenMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get("/home", verifyToken, checkRole("aslab"), function (req, res) {
  res.render("aslab/home", { title: "Home" });
});

module.exports = router;
