const { NOT_FOUND } = require('../constants');

class DocumentNotFoundError extends Error {
  constructor(message) {
    super();
    this.statusCode = NOT_FOUND;
    this.message = message;
  }
}

module.exports = {
  DocumentNotFoundError,
};
