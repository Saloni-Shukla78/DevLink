const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedData._id;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not exists.");
    }
    req.user=user;
    next();
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
};

module.exports = { userAuth };
