const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsCart = new Schema({
  productId: String, 
  qty: Number,
  date: { type: Date, default: Date.now },
  userId: { type: String },
});

module.exports = mongoose.model("Cart", ProductsCart);
