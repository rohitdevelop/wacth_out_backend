const express = require("express")

const orderRouter = express.Router()
 
const {createOrder,getAllOrders,getUserOrders} = require("../controllers/order.controller")
const verifyToken = require("../middleware/auth.middleware")

orderRouter.post("/createOrder",verifyToken,  createOrder)
orderRouter.get("/getAllOrders", verifyToken, getAllOrders)
orderRouter.get("/getUserOrders/:userId", verifyToken, getUserOrders)


module.exports = orderRouter