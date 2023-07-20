const { DEFAULT_ERROR } = require('../errors/errorsCode');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
