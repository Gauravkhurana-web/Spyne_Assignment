const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();
const authenticate = require("../middleware/authMiddlewareHandler");

router.use(authenticate);
router.post("/", commentController.addComment);
router.put("/:commentId", commentController.updateComment);
router.delete("/:commentId", commentController.deleteComment);
router.post("/:commentId/like", commentController.likeComment);
router.post("/:commentId/reply", commentController.replyToComment);

module.exports = router;
