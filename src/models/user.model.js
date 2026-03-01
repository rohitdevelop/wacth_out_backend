const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "with thise someone is already login"]
    },
    password:String,
    gender: String,
    age:Number,
    createdat: Date
 })

const UserModel =  mongoose.model("users", userShema)

 module.exports = UserModel