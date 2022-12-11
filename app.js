require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter, DB_URL } = require('./config');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://api.diplom.baturina.nomoredomains.icu',
    'http://api.diplom.baturina.nomoredomains.icu',
    'https://diplom.baturina.nomoredomains.icu',
    'http://diplom.baturina.nomoredomains.icu',
  ],
  credentials: true,
}));

app.use(requestLogger);
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routers);

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
