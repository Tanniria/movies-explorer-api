const router = require('express').Router();
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');
const {
  validateCreateMovie, validateDeleteMovie,
} = require('../middlewares/validate');

router.get('/', getMovies);
router.post('/', createMovie, validateCreateMovie);
router.delete('/:movieId', deleteMovie, validateDeleteMovie);

module.exports = router;
