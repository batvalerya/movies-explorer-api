const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/users/me', express.json(), getUserInfo);
userRoutes.patch('/users/me', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), updateUser);

module.exports = {
  userRoutes,
};
