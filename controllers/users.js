const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERROR_CODE } = require('../utils/constants');
const BadRequestError = require('../errors/badRequestError');
const NotFound = require('../errors/notFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports.getCurrentUser = async (req, res, next) => {
  await User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(ERROR_CODE.OK).send({ email: user.email, name: user.name });
      } else {
        next(new NotFound('Пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Введены некорректные данные поиска'));
      }
      return next(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  await bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(ERROR_CODE.CREATED).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с такой почтой уже существует'),
        );
      }
      return next(err);
    });
};

module.exports.updateUser = async (req, res, next) => {
  const { email, name } = req.body;
  await User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(ERROR_CODE.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с такой почтой уже существует'),
        );
      }
      return next(err);
    });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  await User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
