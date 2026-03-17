const sellerModel = require("../models/sell.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imageKit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
exports.createSeller = async (req, res) => {
  try {
    const { name, phone, address, watchDetails } = req.body;

    // ✅ Upload image
    const result = await imageKit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
    });

    const imageUrl = result.url;

    let parsedWatch = [];
    let parsedAddress = [];

    if (watchDetails) {
      parsedWatch =
        typeof watchDetails === "string"
          ? JSON.parse(watchDetails)
          : watchDetails;
    }
    if (parsedAddress) {
      parsedAddress =
        typeof address === "string" ? JSON.parse(address) : address;
    }

    // 🚨 safety check
    if (!parsedWatch || parsedWatch.length === 0) {
      return res.status(400).json({
        message: "watchDetails is required",
      });
    }
    if (!parsedAddress || parsedAddress.length === 0) {
      return res.status(400).json({
        message: "parsedAddress is required",
      });
    }

    // ✅ add image
    parsedWatch[0].image = imageUrl;

    const seller = await sellerModel.create({
      name,
      phone,
      address: parsedAddress,
      watchDetails: parsedWatch,
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
