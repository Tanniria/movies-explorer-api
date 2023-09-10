const Movie = require('../models/movie');
const { ERROR_CODE } = require('../utils/constants');
const BadRequestError = require('../errors/badRequestError');
const NotFound = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getMovies = async (req, res, next) => {
  await Movie.find({ owner: req.user._id })
    .then((movies) => res.status(ERROR_CODE.OK).send(movies))
    .catch(next);
};

module.exports.addMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  await Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(ERROR_CODE.CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError('Введены некорректные данные при создании фильма'),
        );
      }
      return next(err);
    });
};

module.exports.deleteMovie = async (req, res, next) => {
  await Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм с указанным _id не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление чужого фильма');
      }
      return movie
        .deleteOne()
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      return next(err);
    });
};
