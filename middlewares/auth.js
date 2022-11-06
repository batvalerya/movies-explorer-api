const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { TokenErrorMessage } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(TokenErrorMessage);
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
