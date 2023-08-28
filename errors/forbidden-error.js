class ForbiddenError extends Error {
  constructor(message = "Forbidden Error") {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = { ForbiddenError };
