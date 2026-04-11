const express = require("express")
const authRouter = require("../src/routes/auth.routes")
const sellRouter = require("../src/routes/sell.routes")
const ProductRouter = require("../src/routes/product.routes")
const contactRouter = require("./routes/contact.routes")
const orderRouter = require("./routes/orders.routes")
const cookieParser = require("cookie-parser")

const app = express() // 
const cors = require("cors");
const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://wacth-out.vercel.app";

app.use(
  cors({
    origin: "https://wacth-out.vercel.app",
    credentials: true, // allow cookies
  })
);

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter); // its called prifix /api
app.use('/api/sell', sellRouter); // its called prifix /api
app.use('/api/products', ProductRouter); // its called prifix /api
app.use('/api/contact', contactRouter); // its called prifix /api
app.use('/api/order', orderRouter);  // its called prifix /api



module.exports = app