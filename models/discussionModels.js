const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String },
  hashtags: { type: [String], required: true },
  createdOn: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model("Discussion", discussionSchema);
