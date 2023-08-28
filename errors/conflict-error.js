class ConflictError extends Error {
  constructor(message = "Conflict Error") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { ConflictError };
