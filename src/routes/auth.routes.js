const express = require("express")

const authRouter = express.Router()

const {signup,login,users} = require("../controllers/user.controller")

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/users", users)


module.exports = authRouter