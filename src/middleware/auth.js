const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {

    let token;

     if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ Check Cookie
    if (!token && req.cookies?.jwt_token) {
      token = req.cookies.jwt_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports = auth;