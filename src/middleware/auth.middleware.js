// const jwt = require("jsonwebtoken");
// const redis = require("../config/cache")

// const authaddress = (req, res, next) => {
//   try {

//     let token;

//      if (req.headers.authorization) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     // 2️⃣ Check Cookie
//     if (!token && req.cookies?.jwt_token) {
//       token = req.cookies.jwt_token;
//     }

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided"
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;

//     next();

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// };

// // middleware/
// const authseller = (req, res, next) => {
//   try {

//  const token = req.cookies.jwt_token;
  
//        if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized: Token not provided",
//       });
//     }
//     let decode = null;
//     try {
//       decode = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       return res.status(401).json({
//         message: "Invalid or expired token",
//       });
//     }
 
//     req.user = decode;

//     next();

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// };

// const verifyToken = (req, res,next) =>{
//  try {

//  const token = req.cookies.jwt_token;
  
//        if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized: Token not provided",
//       });
//     }
//     let decode = null;
//     try {
//       decode = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       return res.status(401).json({
//         message: "Invalid or expired token",
//       });
//     }
 
//     req.user = decode;

//     next();

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// }

// module.exports = authaddress, authseller,verifyToken;


const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Get token from Header
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ If not in header, check cookie
    if (!token && req.cookies?.jwt_token) {
      token = req.cookies.jwt_token;
    }

    // 3️⃣ Token not found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // 4️⃣ Check Redis blacklist
    const isBlacklisted = await redis.get(token);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token is blacklisted",
      });
    }

    // 5️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 6️⃣ Attach user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;