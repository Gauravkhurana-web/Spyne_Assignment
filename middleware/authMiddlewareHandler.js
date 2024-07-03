const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const ACCESS_SECRET_TOKEN = "gaurav123";

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET_TOKEN);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

module.exports = authenticate;
