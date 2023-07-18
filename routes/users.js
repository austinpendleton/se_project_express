const router = require("express").Router();
const {
  getCurrentUser,
  updateProfile,
  createUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

// router.get("/:userId", getUser);
// router.get("/", getUsers);
// router.post("/", createUser);

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);

module.exports = router;
