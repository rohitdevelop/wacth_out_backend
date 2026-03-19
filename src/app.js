const express = require("express")
const authRouter = require("../src/routes/auth.routes")
const sellRouter = require("../src/routes/sell.routes")
const ProductRouter = require("../src/routes/product.routes")
const cookieParser = require("cookie-parser")

const app = express() // 
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter); // its called prifix /api
app.use('/api/sell', sellRouter); // its called prifix /api
app.use('/api/products', ProductRouter); // its called prifix /api




module.exports = app