const express = require("express");

const ProductRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  createproduct,
  allproducts,
  deleteproducts,
  Editproducts
} = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

ProductRouter.post(
  "/createproduct",
  upload.array("productImage"),
  authMiddleware,
  role("admin"),
  createproduct,
);
ProductRouter.delete(
  "/deleteproducts/:id",
   authMiddleware,
  role("admin"),
  deleteproducts,
);
ProductRouter.patch(
  "/Editproducts/:id",
   authMiddleware,
  role("admin"),
  Editproducts,
);
ProductRouter.get("/allproducts", allproducts);

module.exports = ProductRouter;
