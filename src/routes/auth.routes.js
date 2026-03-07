const express = require("express")

const authRouter = express.Router()

const {signup} = require("../controllers/user.controller")

authRouter.post("/signup", signup)


module.exports = authRouter