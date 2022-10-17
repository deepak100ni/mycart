const mongoose = require("mongoose");
const { Schema } = mongoose;

const Products = new Schema({
  title: String, // String is shorthand for {type: String}
  description: String,
  price: Number,
  comments: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Products", Products);
