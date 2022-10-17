const mongoose = require("mongoose");
const { Schema } = mongoose;

const Products = new Schema({
  productId: String,
  date: { type: Date, default: Date.now },
  userId: { type: String },
  qty: { type: Number },
  title: String, // String is shorthand for {type: String}
  description: String,
  price: Number,
  comments: String,
});

module.exports = mongoose.model("UserProducts", Products);
