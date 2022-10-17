const express = require("express");
var Products = require("../models/Products");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const getUserDetails = require("../middleware/getUserDetails");
const ProductsCart = require("../models/ProductsCart");
router.get("/", function (req, res) {
  res.send("hello this is Homepage");
  console.log(req.body);
});

// Add a New Product using Post "/products/addProduct" no auth require 
router.post(
  "/products/addProduct",
  body("title", 'Enter a Valid title').isLength({ min: 5 }),
  body("description", 'enter a valid desc').isLength({ min: 5 }),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,price,comments} = req.body;
    const product = Products.create({
      title:title,
      description:description,
      price:price,
      comments:comments
    });
    res.send(product);
  }
);

//get all products using Post "/products/getallproducts" Require auth
router.post("/products/getallproducts", async (req, res) => {
  const products = await Products.find().limit(5).sort({ _id: -1 });
  res.send(products);
});


// Add a Product to cart using Post "/products/addtocart" require auth
router.post("/addtocart", getUserDetails, function (req, res) {
  const { productId, qty } = req.body;
  const userId = req.getUserDetails;
  const product = ProductsCart.create({
    qty: qty,
    productId: productId,
    userId: userId,
  });
  res.send({ success: true, message: "Product added to cart Successfully" });
});
module.exports = router;