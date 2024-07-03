const Follow = require("../models/followModels");
//const User = require("../models/userModels");

exports.followUser = async (req, res) => {
  try {
    const { followerId, followeeId } = req.body;

    if (!followerId || !followeeId) {
      return res
        .status(400)
        .json({ message: "Follower ID and Followee ID are required" });
    }

    if (followerId === followeeId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const follow = new Follow({ followerId, followeeId });
    await follow.save();
    res.status(201).json({ message: "User followed successfully", follow });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { followerId, followeeId } = req.body;

    if (!followerId || !followeeId) {
      return res
        .status(400)
        .json({ message: "Follower ID and Followee ID are required" });
    }

    const result = await Follow.findOneAndDelete({ followerId, followeeId });
    if (!result) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }
    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const followers = await Follow.find({ followeeId: userId }).populate(
      "followerId",
      "name email"
    );
    res.status(200).json(followers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listFollowees = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const followees = await Follow.find({ followerId: userId });
    res.status(200).json(followees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
