const { ServerErrorMessage } = require('../constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? ServerErrorMessage : err.message;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
