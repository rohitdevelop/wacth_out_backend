const express = require("express")

const authRouter = express.Router()

const {signup,login,users, address,deleteUser,logoutuser} = require("../controllers/user.controller")
const verifyToken = require("../middleware/auth.middleware") // JWT token middleware
const authaddress = require("../middleware/auth.middleware") // JWT adress middleware
 const role = require("../middleware/role");

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/users", users)
authRouter.post("/address",authaddress, address)
authRouter.post("/logoutuser", logoutuser)


// its have to delete admin members
authRouter.delete("/delete-user/:id",verifyToken,role("admin"), deleteUser)
 

module.exports = authRouter