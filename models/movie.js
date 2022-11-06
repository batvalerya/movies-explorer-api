const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return /(http|https):\/\/[\w\d\-./]+\.[a-z]{2,}/.test(url);
      },
      message: (props) => `${props.value} is not a valid image url`,
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return /(http|https):\/\/[\w\d\-./]+\.[a-z]{2,}/.test(url);
      },
      message: (props) => `${props.value} is not a valid trailer url`,
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return /(http|https):\/\/[\w\d\-./]+\.[a-z]{2,}/.test(url);
      },
      message: (props) => `${props.value} is not a valid thumbnail url`,
    },
  },
  owner: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
