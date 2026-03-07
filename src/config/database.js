const mongoose = require("mongoose");

const Dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_STANDARD_URL);
    console.log("✅ DB Connected Successfully");
  } catch (error) {
    console.error("❌ DB Connection Failed:");
    console.error(error.message);
    process.exit(1); // stop app if DB fails
  }
};
module.exports = Dbconnect;