const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;
const JWT_SECRET_KEY = 'some-secret-key';

module.exports = {
  PORT,
  DB_URL,
  JWT_SECRET_KEY,
};
