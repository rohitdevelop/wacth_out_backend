const  mongoose  = require("mongoose");
 

    const connect  = async () => {
    const res = await mongoose.connect(process.env.MONGO_URL)

    if (!res) {
        console.log("db not conneted");
    }
    
    console.log("db  conneted");

  }

  module.exports = connect 