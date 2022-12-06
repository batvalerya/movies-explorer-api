const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { BadRequestError } = require('../errors/BadRequestError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { OK } = require('../constants');
const {
  ConflictErrorMessage,
  BadRequestErrorMessage,
  NotFoundUserErrorMessage,
  UnauthorizedErrorMessage,
  RemoveJwtSuccessMessage,
} = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.status(OK).send(user);
      } else {
        next(new NotFoundError(NotFoundUserErrorMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestErrorMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(ConflictErrorMessage));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name, email, password: hashedPassword,
      })
        .then((user) => res.send({ data: user }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError(ConflictErrorMessage));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError(BadRequestErrorMessage));
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail()
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign(
              {
                _id: user._id,
              },
              NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
              { expiresIn: '7d' },
            );
            res.cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              sameSite: true,
            });

            res.send({ token }).end();
          } else {
            next(new UnauthorizedError(UnauthorizedErrorMessage));
          }
        });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new UnauthorizedError(UnauthorizedErrorMessage));
      } else {
        next(err);
      }
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: true,
  })
    .status(OK).send({ message: RemoveJwtSuccessMessage });
};

module.exports = {
  getUserInfo,
  updateUser,
  createUser,
  login,
  logout,
};
