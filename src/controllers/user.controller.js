const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");
const crypto = require("crypto");

// 🔹 helper: hash token for Redis
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// 🔹 GET ALL USERS
exports.users = async (req, res) => {
  try {
    const users = await userModel.find().lean();

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    let role = "user";

    if (email === "admin@gmail.com") {
      role = "admin";
    }

    const user = await userModel.create({
      name,
      email,
      password: hashpassword,
      age,
      gender,
      role,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "Signup successful",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 🔹 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 ADD ADDRESS
exports.address = async (req, res) => {
  try {
    const { street, city, state, country, zipCode } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.address.push({ street, city, state, country, zipCode });

    await user.save();

    res.json({
      success: true,
      message: "Address added successfully",
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 DELETE ADRESS
exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { address: { _id: addressId } },
      },
      { returnDocument: "after" },
    );

    res.json({
      success: true,
      message: "Address deleted successfully",
      address: user.address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 🔹 LOGOUT
exports.logoutuser = async (req, res) => {
  try {
    const token = req.cookies?.jwt_token;

    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    const hashedToken = hashToken(token);

    await redis.set(hashedToken, "blacklisted", "EX", 60 * 60 * 24);

    res.clearCookie("jwt_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};

// 🔹 DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// edit profile
exports.editProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const allowedUpdates = [
      "name",
      "phone",
      "address",
      "gender",
      "age",
      "avatar",
    ];

    const updates = {};

    console.log(Object.keys);

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const userdeta = await userModel
      .findByIdAndUpdate(userId, updates, { new: true })
      .select("-password");

    if (!userdeta) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: userdeta,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
