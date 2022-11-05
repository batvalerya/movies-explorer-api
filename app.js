require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter, DB_URL } = require('./config');
const { signUpValidator, signInValidator } = require('./validator');
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
    'https://api.diplom.baturina.nomoredomains.icu/',
    'http://api.diplom.baturina.nomoredomains.icu/',
  ],
  credentials: true,
}));

app.use(requestLogger);
app.use(limiter);

app.post('/signup', express.json(), signUpValidator, createUser);

app.post('/signin', express.json(), signInValidator, login);

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
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
}

main();
