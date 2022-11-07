const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT_ERROR = 409;
const FORBIDDEN = 403;

const BadRequestErrorMessage = 'Некорректный запрос';
const BadRequestMovieErrorMessage = 'Некорректный id фильма';
const ConflictErrorMessage = 'Логин занят';
const ForbiddenErrorMessage = 'Доступ запрещен';
const NotFoundUserErrorMessage = 'Пользователь с указанным id не найден';
const NotFoundMovieErrorMessage = 'Фильм с указанным id не найден.';
const TokenErrorMessage = 'Необходима авторизация';
const UnauthorizedErrorMessage = 'Неправильный логин или пароль';
const NotFoundPageErrorMessage = 'Страница не найдена';
const RemoveMovieSuccess = 'Фильм удален';
const ServerErrorMessage = 'На сервере произошла ошибка';
const UrlErrorMessage = 'Неправильный формат ссылки';
const RemoveJwtSuccessMessage = 'JWT из куки удален';

module.exports = {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT_ERROR,
  FORBIDDEN,
  BadRequestErrorMessage,
  ConflictErrorMessage,
  ForbiddenErrorMessage,
  NotFoundUserErrorMessage,
  NotFoundMovieErrorMessage,
  UnauthorizedErrorMessage,
  NotFoundPageErrorMessage,
  TokenErrorMessage,
  BadRequestMovieErrorMessage,
  RemoveMovieSuccess,
  ServerErrorMessage,
  UrlErrorMessage,
  RemoveJwtSuccessMessage,
};
