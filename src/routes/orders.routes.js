const express = require("express")

const orderRouter = express.Router()
 
const {createOrder,getAllOrders,getUserOrders} = require("../controllers/order.controller")
const authMiddleware = require("../middleware/auth.middleware")

orderRouter.post("/createOrder",authMiddleware,  createOrder)
orderRouter.get("/getAllOrders", authMiddleware, getAllOrders)
orderRouter.get("/getUserOrders/:userId", authMiddleware, getUserOrders)


module.exports = orderRouter