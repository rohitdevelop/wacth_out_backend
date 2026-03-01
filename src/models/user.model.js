const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    gender: String,
    age:Number,
    createdat: Date
 })

const UserModel =  mongoose.model("users", userShema)

 module.exports = UserModel