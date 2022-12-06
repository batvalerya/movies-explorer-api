const { FORBIDDEN } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.statusCode = FORBIDDEN;
    this.message = message;
  }
}

module.exports = {
  ForbiddenError,
};
