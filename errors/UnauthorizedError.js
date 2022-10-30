const { UNAUTHORIZED } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.statusCode = UNAUTHORIZED;
    this.message = message;
  }
}

module.exports = {
  UnauthorizedError,
};
