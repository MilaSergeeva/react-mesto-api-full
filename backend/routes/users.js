const router = require("express").Router();

const {
  getUsers,
  getCurrentUser,
  getUserByID,
  updateUserInfoByID,
  updateUserAvatarByID,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", getCurrentUser);
router.get("/users/:id", getUserByID);
router.patch("/users/me", updateUserInfoByID);
router.patch("/users/me/avatar", updateUserAvatarByID);

module.exports = router;
