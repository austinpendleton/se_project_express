const ClothingItem = require("../models/clothingItem");

const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

//Error Handling

function handleError(res, e) {
  if (e.name === "ValidationError" || e.name === "AssertionError") {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to params or invalid data passed to methods for creating item",
    });
  }
  if (e.name === "CastError") {
    return res.status(ERROR_400).send({
      message:
        "No clothing item with that ID or request was send to non existent address",
    });
  }
  return res.status(ERROR_500).send({
    message: "Error has occurred on server",
    e,
  });
}

function handleFindIdError(req, res, e) {
  if (
    e.name === "CastError" ||
    e.name === "ValidationError" ||
    e.name === "AssertionError"
  ) {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to params or invalid data passed to methods for creating item",
    });
  }
  if (e.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message:
        "No clothing item with that ID or request was send to non existent address",
    });
  }
  return res
    .status(ERROR_500)
    .send({ message: "Error has occurred on server", e });
}

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      handleError(req, res, e);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      handleError(req, res, e);
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;
  console.log(itemId, imageURL);
  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error from updateItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      handleFindIdError(req, res, e);
    });
};

//Likes

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user_.id } },
    { new: true }
  )
    .orFail()
    .then(() => res.status(200).send({ message: "Successfully liked item" }))
    .catch((e) => {
      handleFindIdError(req, res, e);
    });
};

function dislikeItem(req, res) {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(() => res.status(200).send({ data: item }))
    .catch((e) => {
      handleFindIdError(req, res, e);
    });
}

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
