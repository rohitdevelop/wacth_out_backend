const express = require("express")
const authRouter = require("../src/routes/auth.routes")
const sellRouter = require("../src/routes/sell.routes")
const cookieParser = require("cookie-parser")

const app = express() // 
app.use(express.json())

app.use(cookieParser())
app.use('/api/auth', authRouter); // its callled prifix /api
app.use('/api/sell', sellRouter); // its callled prifix /api




module.exports = app