const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { JWT_SECRET_KEY = 'some-secret-key' } = process.env;

module.exports = {
  PORT,
  DB_URL,
  JWT_SECRET_KEY,
};
