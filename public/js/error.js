class CustomError extends Error {
  constructor(message, errors) {
    super(message);
    this.msg = message;
    this.errors = errors;
  }
}
