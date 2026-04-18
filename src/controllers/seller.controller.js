const sellerModel = require("../models/sell.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
 const imageKit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


// Get all watches of a single user
exports.sellWatches = async (req, res) => {
  try {
    const allWatches = await sellerModel.find({ user: req.user.id });

    if (!allWatches || allWatches.length === 0) {
      return res.status(404).json({
        message: "No watches found for this user",
      });
    }
 
    res.status(200).json({ message: "all wacthc done", allWatches });
  } catch (error) {
    res.status(500).json({ message: "server serror", error });
  }
};

// get all watches of a all user
exports.getAllWatches = async (req, res) => {
  try {
    const allWatches = await sellerModel.find();

    if (!allWatches || allWatches.length === 0) {
      return res.status(404).json({
        message: "No watches found for sell",
      });
    }
 
    res.status(200).json({ message: "all wacthes done", allWatches });
  } catch (error) {
    res.status(500).json({ message: "server serror", error });
  }
};

exports.createSeller = async (req, res) => {
  try {
    const { name, phone, address, watchDetails } = req.body;

    //  Upload image
    const result = await imageKit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: "seller-watches",
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
    if (address) {
      parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;
    }
    
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
    console.log("watchDetails:", watchDetails);
    
    parsedWatch[0].image = imageUrl;
    
    const seller = await sellerModel.create({
      name,
      phone,
      address: parsedAddress,
      watchDetails: parsedWatch,
      user: req.user.id,
    });
    
    res.status(201).json({
      message: "Seller created successfully",
      seller,
    });
  } catch (error) {
     res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
