const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');

const { userInfoValidate } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', userInfoValidate, updateUser);

module.exports = router;
