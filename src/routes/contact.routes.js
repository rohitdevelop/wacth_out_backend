const express = require("express")

const contactRouter = express.Router()

const {createMessage,allMessages} = require("../controllers/contact.controller")

contactRouter.post("/createMessage",createMessage)
contactRouter.get("/allMessages",allMessages)

module.exports = contactRouter