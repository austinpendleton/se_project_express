const User = require("../models/users");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

// Error Handling

function catchErrorHandler(res, e) {
  if (e.name === "ValidationError" || e.name === "AssertionError") {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to params or invalid data passed to methods for creating item",
    });
  }
  if (e.name === "CastError") {
    return res.status(ERROR_400).send({
      message:
        "No user with that ID or request was send to non existent address",
    });
  }
  return res.status(ERROR_500).send({
    message: "Error has occurred on server",
    e,
  });
}

// get users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      catchErrorHandler(res, e);
    });
};

//get USER
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      if (e.name === "DocumentNotFound") {
        return res.status(ERROR_404).send({
          message:
            "No user with that ID or request was send to non existent address",
        });
      }
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
      return res.status(ERROR_500).send({
        message: "Error has occurred on server",
        e,
      });
    });
};

// create user

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      catchErrorHandler(res, e);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
