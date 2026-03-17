const express = require("express")

const sellRouter = express.Router()
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage() })


const {createSeller} = require("../controllers/seller.controller")


sellRouter.post("/createSeller", upload.single("image"), createSeller)


module.exports = sellRouter