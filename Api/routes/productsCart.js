const express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const getUserDetails = require("../middleware/getUserDetails");
const ProductsCart = require("../models/ProductsCart");
router.post("/", function (req, res) {
  res.send("hello this is ProductsCart Homepage");
  console.log(req.body);
});

// Add a New Product using Post "/products/addtocart" require auth
router.post(
  "/addtocart",
  getUserDetails,
  function (req, res) {
    const { productId, qty } = req.body;
    const userId = req.getUserDetails;
    const product = ProductsCart.create({
      qty: qty,
      productId: productId,
      userId: userId,
    });
    res.send({success:true,message:"Product added to cart Successfully"});
  }
);
module.exports = router;