const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// all users get method
exports.users = async (req, res) => {
  try {

    const users = await userModel.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// singup post method
exports.signup = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    const exist = await userModel.findOne({ email });
    
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashpassword,
      age,
      gender,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt_token", token, { httpOnly: true });

    res.status(201).json({
      message: "Signup successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login post method
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
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt_token", token, { httpOnly: true });

    res.json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/user/address
exports.address = async (req, res) => {
  try {

    const { street, city, state, country, zipCode } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.address.push({
      street,
      city,
      state,
      country,
      zipCode
    });

    await user.save();

    res.json({
      success: true,
      message: "Address added successfully",
      address: user.address
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// delet user admin only /delete-user/:id

exports.deleteUser = async (req, res) => {
 try {
  const {id} = req.params
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}