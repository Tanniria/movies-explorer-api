require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const defaultError = require('./middlewares/defaultError');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL } = require('./utils/constants');
const limiter = require('./middlewares/rateLimit');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());

mongoose.connect(MONGO_URL);

app.use(limiter);

app.use(helmet());

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(defaultError);

app.listen(PORT);
