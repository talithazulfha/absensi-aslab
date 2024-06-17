const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect("/login");
      //return res.status(403).send('No token provided.');
    }
  
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to verify token.' });
      }
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });

  }

  module.exports = verifyToken;