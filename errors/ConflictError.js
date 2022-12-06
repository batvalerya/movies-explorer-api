const { CONFLICT_ERROR } = require('../constants');

class ConflictError extends Error {
  constructor(message) {
    super();
    this.statusCode = CONFLICT_ERROR;
    this.message = message;
  }
}

module.exports = {
  ConflictError,
};
