const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");

var Users = require("../models/Users");
const getUserDetails = require("../middleware/getuserdetails");
var router = express.Router();
let jwtSecretKey = process.env.JWT_SECRET_KEY;

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname,"../static/index.html"));
});

// (SignUp) Add a New User using Post "/users/signup" Doesn't require auth
router.post(
  "/signup",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Enter a valid Name, length should be 5").isLength({ min: 5 }),
    body("password", "Enter a valid password, length should be 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    try {
      let alereadyUser = await Users.findOne({ email: req.body.email });

      if (alereadyUser) {
        return res.send({
          success: false,
          message: "Sorry, A User With this email is already exists."
        });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass =  bcrypt.hashSync(req.body.password, salt);
      const users = Users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      let obj = {
        user: {
          id: users.id,
        },
      };
      var token = jwt.sign(obj, process.env.JWT_SECRET_KEY);
      res.json({ success: true, token: token, message:"You are now a part of mycart." });
      // res.send(req.body);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);



// Login User using Post "/users/login" require auth
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    try {
      
      let findUser = await Users.findOne({
        email: req.body.email
      });
      if (!findUser) {
        return res
          .send({ success: false, message: "Wrong Credentials." });
      }

      const secPass = await bcrypt.compare(req.body.password, findUser.password);
      if(!secPass){
        return res.send({ success: false, message: "Wrong Credentials." });
      }

      let obj = {
        user: {
          id: findUser.id,
        },
      };
      var token = jwt.sign(obj, process.env.JWT_SECRET_KEY);
      res.json({ success: true, token: token });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);


//get logged in user details using Post "/users/userdetails" require auth
router.post("/userdetails",getUserDetails,async (req, res) => {
  try {
    const userId = req.getUserDetails;
    let findUser = await Users.findOne({
      userId: userId,
    }).select('-password');
    if (!findUser) {
      return res.send({ success: false, message: "User not found." });
    }
    res.json({ userDetails: findUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
module.exports = router;
