const express = require("express")

const sellRouter = express.Router()
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage() })


const {createSeller,sellWatches} = require("../controllers/seller.controller")
const authseller = require("../middleware/auth.middleware")

sellRouter.post("/createSeller", upload.single("image"),authseller, createSeller)
sellRouter.get("/sellWatches",authseller,  sellWatches)


module.exports = sellRouter