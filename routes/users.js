const router = require('express').Router();
const {
  getCurrentUser, updateUserProfile,
} = require('../controllers/users');
const {
  validateUpdateProfile,
} = require('../middlewares/validate');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserProfile, validateUpdateProfile);

module.exports = router;
