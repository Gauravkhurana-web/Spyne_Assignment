const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const ACCESS_SECRET_TOKEN = "gaurav123";

exports.signup = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    if (!name || !mobile || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobile, email, password: hashedPassword });
    await user.save();
    const accessToken = jwt.sign(
      {
        user: {
          username: user.name,
          email: user.email,
          _id: user._id,
        },
      },
      ACCESS_SECRET_TOKEN,
      { expiresIn: "15m" }
    );
    res.status(201).json({ message: "Signup successful", accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // give token as a  response
    const accessToken = jwt.sign(
      {
        user: {
          username: user.name,
          email: user.email,
          _id: user._id,
        },
      },
      ACCESS_SECRET_TOKEN,
      { expiresIn: "15m" }
    );
    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user = null;
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
