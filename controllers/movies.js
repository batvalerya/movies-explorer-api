const Movie = require('../models/movie');
const { OK } = require('../constants');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const {
  BadRequestMovieErrorMessage,
  NotFoundMovieErrorMessage,
  ForbiddenErrorMessage,
  RemoveMovieSuccess,
} = require('../constants');

const getMovies = (req, res, next) => {
  try {
    Movie.find({})
      .then((movies) => {
        res.status(OK).send(movies);
      });
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  req.body.owner = req.user._id;
  try {
    const movie = await new Movie(req.body).save();
    res.status(OK).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BadRequestMovieErrorMessage));
    } else {
      next(err);
    }
  }
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError(NotFoundMovieErrorMessage))
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError(ForbiddenErrorMessage));
      }
      return movie.remove()
        .then(() => res.send({ message: RemoveMovieSuccess }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BadRequestMovieErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
