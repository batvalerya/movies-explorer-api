const express = require('express');
const { updateUserValidator } = require('../validator');
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/users/me', express.json(), getUserInfo);
userRoutes.patch('/users/me', express.json(), updateUserValidator, updateUser);

module.exports = {
  userRoutes,
};
