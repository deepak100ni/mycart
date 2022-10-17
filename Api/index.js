const express = require("express");
require("dotenv").config();
var cors = require("cors");
const connectToMongoose = require("./databse/db");
connectToMongoose();

var productrouter = require('./routes/products');
var userproductrouter = require('./routes/userproducts');
var usersRouter = require('./routes/users');
var cartRouter = require('./routes/productsCart');
var ordersRouter = require('./routes/orders');
 

const app = express();
app.use(cors());
const port = (process.env.PORT || 5000);

app.use(express.json())
app.use("/", productrouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);
app.use("/userproducts", userproductrouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Example1 app listening on port ${port}`);
});
