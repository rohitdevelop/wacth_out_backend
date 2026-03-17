const sellerModel = require("../models/sell.model");

exports.createSeller = async (req, res) => {
  try {
    const { name, phone, address, watchDetails } = req.body;

    // ✅ Save in DB
    const seller = await sellerModel.create({
      name,
      phone,
      address,
      watchDetails,
    });

    res.status(201).json({
      message: "Seller created successfully",
      seller,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
