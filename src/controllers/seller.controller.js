const sellerModel = require("../models/sell.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const imageKit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

exports.sellWatches = async (req, res) => {
  try {
    const token = req.cookies.jwt_token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not provided",
      });
    }

    let decode = null;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    const allWatches = await sellerModel.find({ user: decode.id });

    if (!allWatches || allWatches.length === 0) {
      return res.status(404).json({
        message: "No watches found for this user",
      });
    }

    if (!allWatches) {
      res.status(401).json({ message: "all wacthn not" }, allWatches);
    }

    res.status(201).json({ message: "all wacthc done", allWatches });
  } catch (error) {
    res.status(500).json({ message: "server serror", error });
  }
};

exports.createSeller = async (req, res) => {
  try {
    const { name, phone, address, watchDetails } = req.body;

    const token = req.cookies.jwt_token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not Provided, Unauthrized acess" });
    }
    let decode = null;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

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

    parsedWatch[0].image = imageUrl;

    const seller = await sellerModel.create({
      name,
      phone,
      address: parsedAddress,
      watchDetails: parsedWatch,
      user: decode.id,
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
