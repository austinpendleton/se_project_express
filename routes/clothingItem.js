const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const {
  idValidation,
  clothingItemValidation,
} = require("../middlewares/validation");

router.get("/", getItems);

router.use(auth);

router.post("/", clothingItemValidation, createItem);

router.put("/:itemId/likes", idValidation, likeItem);

router.delete("/:itemId", idValidation, deleteItem);
router.delete("/:itemId/likes", idValidation, dislikeItem);

module.exports = router;
