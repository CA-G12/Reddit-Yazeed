class ServerError extends Error {
  constructor({
    message, label, status, errors,
  }) {
    super(message);
    this.messages = message;
    this.status = status;
    this.label = label;
    this.errors = errors;
  }
}

module.exports = ServerError;
