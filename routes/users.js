const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { updateUserValidation } = require("../middlewares/validation");

router.use(auth);

router.get("/me", auth, getCurrentUser);
router.patch("/me", updateUserValidation, updateProfile);

module.exports = router;
