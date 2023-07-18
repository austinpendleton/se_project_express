const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcryptjs");

const user = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Field Required"],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Enter valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Field required"],
    select: false,
  },
  name: {
    type: String,
    required: [true, "Field required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [30, "Name must not exceed 30 characters"],
  },
  avatar: {
    type: String,
    required: [true, "Field Required"],
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png",
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Enter valid URL",
    },
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((endUser) => {
      if (!endUser) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, endUser.password).then((isMatch) => {
        if (!isMatch) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return endUser;
      });
    });
};

module.exports = mongoose.model("user", user);
