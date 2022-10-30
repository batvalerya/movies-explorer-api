const { BAD_REQUEST } = require('../constants');

class BadRequestError extends Error {
  constructor(message) {
    super();
    this.statusCode = BAD_REQUEST;
    this.message = message;
  }
}

module.exports = {
  BadRequestError,
};
