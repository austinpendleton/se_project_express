const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = require("../utils/config");
const { handleError } = require("../utils/errors");

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((error) => {
//       handleError(req, res, error);
//     });
// };

// const getUser = (req, res) => {
//   const { userId } = req.params;
//   User.findById(userId)
//     .orFail()
//     .then((user) => res.status(200).send({ data: user }))
//     .catch((error) => {
//       handleError(req, res, error);
//     });
// };
const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        handleError(req, res, error);
      }
      res.send({ data: user });
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      handleError(req, res, error);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, avatar }))
    .then((user) => {
      const userData = user.toObject();
      res.status(201).send({ data: userData });
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token, mesage: "Here is the token" });
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

module.exports = {
  updateProfile,
  getCurrentUser,
  createUser,
  login,
};
