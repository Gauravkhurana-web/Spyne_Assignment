const Comment = require("../models/commentModels");

exports.addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    comment.likes += 1;
    await comment.save();
    res.status(200).json({ message: "Comment liked successfully", comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.replyToComment = async (req, res) => {
  try {
    const reply = new Comment(req.body);
    await reply.save();
    const comment = await Comment.findById(req.params.commentId);
    comment.replies.push(reply._id);
    await comment.save();
    res.status(201).json({ message: "Reply added successfully", reply });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
