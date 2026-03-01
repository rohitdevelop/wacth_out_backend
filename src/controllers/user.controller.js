const exrpess = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "user alredy exist",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashpassword,
      age,
      gender,
    });


    const jwt =  jwt.sign(
     {
          id: user._id
     },
     process.env.JWT_SECRET
    )
    if (user) {
      res.status(200).json({ message: "Signup successful" });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
