const productModel = require("../models/product.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imageKit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

exports.createproduct = async (req, res) => {
  try {
    const { name, description, price, category, rating, stock } = req.body;

    // Check if images are uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const imageUrls = [];

    // Loop through each uploaded file
    for (let file of req.files) {
      const result = await imageKit.files.upload({
        file: await toFile(file.buffer, file.originalname),
        fileName: file.originalname,
        folder: "products-watches-images",
      });
      imageUrls.push(result.url);
    }

    const product = await productModel.create({
      name,
      productImage: imageUrls, // Array of URLs
      description,
      price,
      category,
      rating,
      stock,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.allproducts = async (req, res) => {
  try {
    const ourproducts = await productModel.find();

    if (!ourproducts || ourproducts.length === 0) {
      return res.status(404).json({
        message: "No watches found for this user",
      });
    }

    res.status(200).json({ message: "all products done", ourproducts });
  } catch (error) {
    res.status(500).json({ message: "server serror", error });
  }
};

exports.deleteproducts = async (req, res) => {
  try {
    const { id } = req.params;

    const productdelete = await productModel.findByIdAndDelete(id);

    if (!productdelete) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.Editproducts = async (req, res) => {
  try {
    const { id } = req.params;

    const productedit = await productModel.findByIdAndUpdate(
      id,
      req.body, // ⭐ important
      {
        new: true,           // return updated data
        runValidators: true, // apply schema validation
      }
    );

    if (!productedit) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: productedit,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};