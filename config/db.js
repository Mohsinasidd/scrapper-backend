const mongoose = require("mongoose");
require("dotenv").config();
module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected with the db ");
  } catch (error) {
    console.log(error);
  }
};
