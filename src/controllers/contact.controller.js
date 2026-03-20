const contactModel = require("../models/contact.model");

exports.createMessage = async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;

    const contact = await contactModel.create({ name, email, topic, message });

    if (!contact) {
      res.status(404).json({ message: "contact is not created" });
    }

    res.status(200).json({ message: "contact is created" });
  } catch (error) {
    res.status(500).json({ message: "server error ", error });
  }
};

exports.allMessages = async (req, res) => {
  try {
    const allmessage = await contactModel.find();

    if (!allmessage) {
      res.status(404).json({ message: "contact is not sowing" });
    }

    res.status(200).json({ message: "all message is fecthed",allmessage });

  } catch (error) {
    res.status(500).json({ message: "server error ", error });
  }
};
