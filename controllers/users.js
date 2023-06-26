const User = require("../models/users");

const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

function catchErrorHandler(res, error) {
  if (error.name === "ValidationError" || error.name === "AssertionError") {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to params or invalid data passed to methods for creating item",
    });
  }
  if (error.name === "CastError") {
    return res.status(ERROR_400).send({
      message:
        "No user with that ID or request was send to non existent address",
    });
  }
  return res.status(ERROR_500).send({
    message: "Error has occurred on server",
    error,
  });
}

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => {
      catchErrorHandler(res, error);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(404).send({ data: user }))
    .catch((error) => {
      catchErrorHandler(res, error);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => {
      catchErrorHandler(res, error);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
