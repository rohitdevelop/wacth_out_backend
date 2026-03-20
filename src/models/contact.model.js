const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    topic: String,
    message: String
},{timestamps:true})

const contactModel = mongoose.model("contact", contactSchema)

module.exports = contactModel