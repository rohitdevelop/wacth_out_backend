const mongoose = require("mongoose");
const UserModel = require("./user.model");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    trim: true,
    required: true,
    default: "India",
  },
  zipCode: {
    type: String,
    trim: true,
    required: true,
  },
});

const watchSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  condition: {
    type: String,
    enum: ["new", "excellent", "good", "fair"],
  },
  description: {
    type: String,
    required: false,
  },
});

const sellerSchema = new mongoose.Schema(
  {
    avtar: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: [addressSchema],
    watchDetails: [watchSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
      required: [true, "user id is required for selling a watch"],
    },
  },

  {
    timestamps: true,
  },
);

const sellerModel = mongoose.model("Seller", sellerSchema);

module.exports = sellerModel;
