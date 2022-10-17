const express = require("express");
var UserProducts = require("../models/UserProducts");
var Products = require("../models/Products");
var router = express.Router();
const getUserDetails = require("../middleware/getUserDetails");

router.post("/",getUserDetails,  async (req, res) => {
    const userId = req.getUserDetails;
    const orders = await UserProducts.find({ userId: userId }).sort({
      _id: -1,
    });
    res.send(orders);
});
router.post("/details", async (req, res) => {
    const productId = req.body.productId;
  const orders = await Products.find({ _id: productId });
  res.send(orders);
});
module.exports = router;