const express = require("express")

const ProductRouter = express.Router()
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage() })

const {createproduct,allproducts} = require("../controllers/product.controller")
const verifyToken = require("../middleware/auth.middleware")
const role = require("../middleware/role")

ProductRouter.post("/createproduct", upload.array("productImage"),verifyToken,role("admin"),  createproduct)
ProductRouter.get("/allproducts",  allproducts)


module.exports = ProductRouter