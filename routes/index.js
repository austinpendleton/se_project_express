const router = require("express").Router();
const clothingItem = require("./clothingItem");
const User = require("./users");
const { ERROR_404 } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");

router.use("/items", clothingItem);
router.use("/users", User);

router.post("/signup", createUser);
router.post("/signin", login);

router.use((req, res) => {
  res
    .status(ERROR_404)
    .send({ message: "The requested resource was not found" });
});

module.exports = router;
