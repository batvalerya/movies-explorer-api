const express = require('express');

const router = express.Router();

const { signUpValidator, signInValidator } = require('../validator');
const { login, createUser, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { userRoutes } = require('./users');
const { movieRoutes } = require('./movies');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotFoundPageErrorMessage } = require('../constants');

router.post('/signup', express.json(), signUpValidator, createUser);
router.post('/signin', express.json(), signInValidator, login);

router.use(auth);
router.use('/', userRoutes);
router.use('/', movieRoutes);
router.get('/signout', express.json(), logout);

router.use((req, res, next) => {
  next(new NotFoundError(NotFoundPageErrorMessage));
});

module.exports = router;
