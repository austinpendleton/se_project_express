const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { updatedUserValidation } = require("../middlewares/validation");
router.get("/me", auth, getCurrentUser);
router.patch("/me", updatedUserValidation, updateProfile);

module.exports = router;
