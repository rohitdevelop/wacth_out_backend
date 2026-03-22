const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "token is requied for blackisting"],
  },
  expiresAt: Date,
});
const blacklist = mongoose.model("Blacklist", blacklistSchema);
module.exports = blacklist;
