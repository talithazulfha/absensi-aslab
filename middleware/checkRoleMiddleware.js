function checkRole(role) {
  
    return function(req, res, next) {
      if (req.userRole === role) {
        next(); 
      } else {
        res.status(403).send('Akses ditolak!');
      }
    };
  }

  module.exports = checkRole;