const router = require("express").Router();
const clothingItem = require("./clothingItem");
const User = require("./users");

router.use("/items", clothingItem);
router.use("/users", User);

router.use((req, res) => {
  res.status(404).send({ message: "The requested resource was not found" });
});

module.exports = router;
