const bcrypt = require("bcryptjs");
const User = require("../models/userModels");

exports.createUser = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    if (!name || !mobile || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobile, email, password: hashedPassword });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  console.log("check");
  console.log(req.params.userId);
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.log("in Catch");
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log(req.params.userId);
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log("success");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchUserByName = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.find({ name: new RegExp(name, "i") });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
