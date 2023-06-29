const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

function handleError(req, res, error) {
  if (error.name === "ValidationError" || error.name === "AssertionError") {
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
  if (error.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message:
        "No clothing item with that ID or request was send to non existent address",
    });
  }
  return res.status(ERROR_500).send({
    message: "User ID not found in the database",
    error,
  });
}

module.exports = {
  ERROR_400,
  ERROR_404,
  ERROR_500,
  handleError,
};
