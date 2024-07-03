const Discussion = require("../models/discussionModels.js");

exports.createDiscussion = async (req, res) => {
  try {
    const { text, image, hashtags } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }

    if (!hashtags) {
      return res.status(400).json({ message: "Hash Tag is required" });
    }

    const discussion = new Discussion({
      text,
      image,
      hashtags,
      userId: req.user._id,
      views: 0,
    });
    await discussion.save();
    res
      .status(201)
      .json({ message: "Discussion created successfully", discussion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(
      req.params.discussionId,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Discussion updated successfully", discussion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    console.log(req.params.discussionId);
    await Discussion.findByIdAndDelete(req.params.discussionId);
    res.status(200).json({ message: "Discussion deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDiscussionsByTags = async (req, res) => {
  try {
    const { tags } = req.query;
    const tagList = tags.split(",").map((tag) => tag.trim());

    const discussions = await Discussion.find({
      hashtags: { $in: tagList },
    });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchDiscussionsByText = async (req, res) => {
  try {
    const discussions = await Discussion.find({
      text: new RegExp(req.query.text, "i"),
    });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
