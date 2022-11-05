const express = require('express');
const { createMovieValidator, deleteMovieByIdValidator } = require('../validator');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const movieRoutes = express.Router();

movieRoutes.get('/movies', express.json(), getMovies);
movieRoutes.post('/movies', express.json(), createMovieValidator, createMovie);

movieRoutes.delete('/movies/:_id', express.json(), deleteMovieByIdValidator, deleteMovieById);

module.exports = {
  movieRoutes,
};
