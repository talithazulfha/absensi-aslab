const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect("/login");
    }
  
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to verify token.' });
      }
      console.log('Decoded JWT:', decoded);
      req.userId = decoded.id;
      req.userRole = decoded.role;
      req.userEmail = decoded.email;
      req.userNama = decoded.namaAnggota;
      next();
    });

  }

  module.exports = verifyToken;