const express = require("express");
const followController = require("../controllers/followController");
const router = express.Router();

router.post("/follow", followController.followUser);
router.post("/unfollow", followController.unfollowUser);
router.get("/:userId/followers", followController.listFollowers);
router.get("/:userId/followees", followController.listFollowees);

module.exports = router;
