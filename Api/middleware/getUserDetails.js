var jwt = require("jsonwebtoken");
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const getUserDetails =  async (req, res, next) => {
    try {
     var data = jwt.verify(req.header("token"), jwtSecretKey);
     req.getUserDetails = data.user.id;
     next();
  } catch (error) {
    res.status(500).send({ error: error.message, msg : 'Server error' });
  }
};

 module.exports = getUserDetails;