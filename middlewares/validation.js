const { celebrate, Joi } = require('celebrate');
const validator = require('validator/');

const isURL = (value, helpers) => (validator.isURL(value) ? value : helpers.message('Некорректная ссылка'));

module.exports.signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.userInfoValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

module.exports.addMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isURL),
    trailerLink: Joi.string().required().custom(isURL),
    thumbnail: Joi.string().required().custom(isURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.movieIdValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required(),
  }),
});
