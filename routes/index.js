const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { signinValidate, signupValidate } = require('../middlewares/validation');
const NotFound = require('../errors/notFoundError');

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => next(new NotFound('Запрашиваемая страница не найдена')));

module.exports = router;
