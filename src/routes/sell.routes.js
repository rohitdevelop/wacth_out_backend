const express = require("express")

const sellRouter = express.Router()
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage() })


const {createSeller,sellWatches} = require("../controllers/seller.controller")
const authMiddleware = require("../middleware/auth.middleware")

sellRouter.post("/createSeller", upload.single("image"),authMiddleware, createSeller)
sellRouter.get("/sellWatches",authMiddleware,  sellWatches)


module.exports = sellRouter