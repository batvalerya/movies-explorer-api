const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { valiateURL } = require('../validator');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const movieRoutes = express.Router();

movieRoutes.get('/movies', express.json(), getMovies);
movieRoutes.post('/movies', express.json(), celebrate({
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
}), createMovie);

movieRoutes.delete('/movies/:_id', express.json(), celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = {
  movieRoutes,
};
