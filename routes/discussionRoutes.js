const express = require("express");
const discussionController = require("../controllers/discussionController");
const router = express.Router();
const authenticate = require("../middleware/authMiddlewareHandler");

router.use(authenticate);
router.post("/", discussionController.createDiscussion);
router.put("/:discussionId", discussionController.updateDiscussion);
router.delete("/:discussionId", discussionController.deleteDiscussion);
router.get("/tags", discussionController.getDiscussionsByTags);
router.get("/search", discussionController.searchDiscussionsByText);

module.exports = router;
