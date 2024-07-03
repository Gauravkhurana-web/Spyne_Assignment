const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authenticate = require("../middleware/authMiddlewareHandler");

router.use(authenticate);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.post("/", userController.createUser);
router.get("/", userController.listUsers);
router.get("/search", userController.searchUserByName);

module.exports = router;
