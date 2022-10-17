const express = require("express");
var UserProducts = require("../models/UserProducts");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const getUserDetails = require("../middleware/getUserDetails");
const ProductsCart = require("../models/ProductsCart");
router.get("/", function (req, res) {
  res.send("hello this is Homepage");
  console.log(req.body);
});

router.post("/", function (req, res) {
  res.send('Welcome');
});


// Add a New Product using Post "/userproducts/addProduct/:productId" require auth
router.post("/addProduct/:productId", getUserDetails, function (req, res) {
  
  const productId = req.params.productId;
  const { qty, title, description, price, comments } = req.body;
  if(productId === ''){
    res.send({success:false,message:"Please send product id"})
  }
  const userId = req.getUserDetails;
  const product = UserProducts.create({
    productId,
    userId,
    qty,
    title,
    description,
    price,
    comments
  });
  res.send({success:true,message:"Item Successfully Placed"});
});

//get all products using Post "/userproducts/getallproducts" Require auth
router.post("/userproducts/getallproducts", getUserDetails, async (req, res) => {
  const userId = req.getUserDetails;
  const products = await Products.find({ userId });
  res.send(products);
});
module.exports = router;

// Add a Product to cart using Post "/userproducts/addtocart" require auth
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
