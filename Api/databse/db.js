const mongoose = require("mongoose");
const connectToMongoose = () => {
  mongoose.connect("mongodb://localhost:27017/mycart", () => {
    console.log("connected to mongoose1");
  });
};

module.exports = connectToMongoose;
