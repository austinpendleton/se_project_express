const ClothingItem = require("../models/clothingItem");

const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

//Error Handling

function handleError(req, res, error) {
  if (error.name === "ValidationError" || error.name === "AssertionError") {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to params or invalid data passed to methods for creating item",
    });
  }
  if (error.name === "CastError") {
    return res.status(ERROR_400).send({
      message:
        "No clothing item with that ID or request was send to non existent address",
    });
  }
  return res.status(ERROR_500).send({
    message: "Error has occurred on server",
    error,
  });
}

function handleFindIdError(req, res, error) {
  if (
    error.name === "CastError" ||
    error.name === "ValidationError" ||
    error.name === "AssertionError"
  ) {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to params or invalid data passed to methods for creating item",
    });
  }
  if (error.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message:
        "No clothing item with that ID or request was send to non existent address",
    });
  }
  return res
    .status(ERROR_500)
    .send({ message: "Error has occurred on server", error });
}

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      handleError(req, res, error);
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((error) => {
      res.status(500).send({ message: "Error from updateItem", error });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((error) => {
      handleFindIdError(req, res, error);
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
    .catch((error) => {
      handleFindIdError(req, res, error);
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
    .catch((error) => {
      handleFindIdError(req, res, error);
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
