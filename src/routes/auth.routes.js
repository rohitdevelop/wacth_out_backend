const express = require("express")

const authRouter = express.Router()

const {signup,login,users, address,deleteUser} = require("../controllers/user.controller")
const authaddress = require("../middleware/auth.middleware") // JWT middleware
//  const roleCheck = require("../middleware/role");

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/users", users)
authRouter.post("/address",authaddress, address)


// its have to delete admin members
authRouter.delete("/delete-user/:id",authaddress, deleteUser)


// authRouter.delete(
//   "/delete-user/:id",
//   auth,                // JWT verify middleware
//   roleCheck(["admin"]), // Role check middleware
//   deleteUser           // Controller
// );



module.exports = authRouter