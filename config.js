const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per `window` (10 minutes)
});

const DB_NAME = process.env.NODE_ENV === 'production' ? process.env.DB_NAME : 'moviesdb';

const DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

module.exports = {
  limiter,
  DB_URL,
};
