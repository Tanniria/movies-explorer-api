require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const { PORT, DB_URL } = require('./utils/constants');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { validateSignin, validateSignup } = require('./middlewares/validate');
const limiter = require('./middlewares/rateLimit');
const NotFoundError = require('./errors/notFoundError');
const defaultError = require('./middlewares/defaultError');

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(requestLogger);

mongoose.connect(DB_URL);

app.use('/signin', validateSignin, login);
app.use('/signup', validateSignup, createUser);

app.use(auth);

app.use('/movies', require('./routes/movies'));
app.use('/users', require('./routes/users'));

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(defaultError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
