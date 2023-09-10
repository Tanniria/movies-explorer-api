const ERROR_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const MONGO_URL = 'mongodb://127.0.0.1/bitfilmsdb';

module.exports = { ERROR_CODE, MONGO_URL };
