const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_403 = 403;
const ERROR_404 = 404;
const ERROR_409 = 409;
const ERROR_11000 = 11000;
const ERROR_500 = 500;

function handleError(req, res, error) {
  if (error.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to params or invalid data passed to methods for creating item",
    });
  }
  if (error.name === "CastError") {
    return res.status(ERROR_400).send({
      message: "Invalid item ID",
    });
  }
  if (error.message === "Incorrect email or password") {
    return res.status(ERROR_401).send({
      message: "Email or password not found",
    });
  }
  if (error.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message:
        "No clothing item with that ID or request was send to non existent address",
    });
  }
  if (error.code === 11000) {
    return res.status(ERROR_409).send({
      message: "Email already in database",
    });
  }
  return res.status(ERROR_500).send({
    message: "An error has occurred on the server",
  });
}

module.exports = {
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_409,
  ERROR_11000,
  ERROR_500,
  handleError,
};
