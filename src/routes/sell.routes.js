const express = require("express")

const sellRouter = express.Router()
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage() })


const {createSeller,sellWatches} = require("../controllers/seller.controller")


sellRouter.post("/createSeller", upload.single("image"), createSeller)
sellRouter.get("/sellWatches",  sellWatches)


module.exports = sellRouter