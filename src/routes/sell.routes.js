const express = require("express")

const sellRouter = express.Router()


const {createSeller} = require("../controllers/seller.controller")


sellRouter.post("/createSeller",createSeller)


module.exports = sellRouter