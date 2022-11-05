const { isURL } = require('validator');
const { Joi, celebrate } = require('celebrate');

const valiateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный офрмат ссылки');
  }
  return value;
};

const signUpValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(valiateURL),
    trailerLink: Joi.string().required().custom(valiateURL),
    thumbnail: Joi.string().required().custom(valiateURL),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieByIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  valiateURL,
  signUpValidator,
  signInValidator,
  updateUserValidator,
  createMovieValidator,
  deleteMovieByIdValidator,
};
