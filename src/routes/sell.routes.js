const express = require("express")

const sellRouter = express.Router()
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage() })


const {createSeller,sellWatches, getAllWatches} = require("../controllers/seller.controller")
const authMiddleware = require("../middleware/auth.middleware")

sellRouter.post("/createSeller", upload.single("image"),authMiddleware, createSeller)
sellRouter.get("/sellWatches",authMiddleware,  sellWatches)
sellRouter.get("/getAllWatches",authMiddleware,  getAllWatches)


module.exports = sellRouter