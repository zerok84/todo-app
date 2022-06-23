const config = require("./config/db");
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(config.DB, connectionParams);
    console.log("Connected to database.");
  } catch (error) {
    console.log("Could not connect to database.", error);
  }
};
