require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors, Joi, celebrate } = require('celebrate');
const { NotFoundError } = require('./errors/NotFoundError');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const { userRoutes } = require('./routes/users');
const { movieRoutes } = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(requestLogger);

app.post('/signup', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);
app.use(userRoutes);
app.use(movieRoutes);
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
}

main();
