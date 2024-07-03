const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  discussionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discussion",
    required: true,
  },
  likes: { type: Number, default: 0 },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Comment", commentSchema);
