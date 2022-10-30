const { isURL } = require('validator');

const valiateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный офрмат ссылки');
  }
  return value;
};

module.exports = {
  valiateURL,
};
