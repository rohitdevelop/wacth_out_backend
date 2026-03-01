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
    const token =  jwt.sign(                //means signature kar deti h
     {
          id: user._id,
          email: user.email
     },
     process.env.JWT_SECRET
    )
    res.cookie("jwt_token",token)
    const user = new userModel.create({
      name,
      email,
      password: hashpassword,
      age,
      gender,
      token
    });



     await user.save()
    if (user) {
      res.status(200).json({ message: "Signup successful" });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
   try {
   const {email, password} = req.body
    
   const EmailMacth = await userModel.findOne({email})

   if (!EmailMacth) return res.status(400).json({ message: "User not found" });
    
   const passwordIsmacth = await bcrypt.compare(password, user.password)
   if (passwordIsmacth) return res.status(400).json({message: "user password incorrect"})
    
   res.json({ token, user: { name: user.name, email: user.email } });

   } catch (error) {
     res.status(500).json({ message: err.message });
    }
}