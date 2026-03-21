// middleware/role.js
const role = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; 

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${allowedRoles.join(", ")}`
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
};

module.exports = role;
 