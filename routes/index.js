const router = require("express").Router();
const clothingItem = require("./clothingItem");
const User = require("./users");

const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { NotFoundError } = require("../errors/not-found-error");
const {
  logInValidation,
  userInfoValidation,
} = require("../middlewares/validation");

router.use("/items", clothingItem);
router.use("/users", auth, User);

router.get(`/crash-rest`, () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signup", userInfoValidation, createUser);
router.post("/signin", logInValidation, login);

router.use(() => {
  throw new NotFoundError("Router Not Found");
});

module.exports = router;
