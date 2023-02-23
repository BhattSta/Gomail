const express = require('express');
const router = express.Router();
const { authValidation } = require('../validations');
const { authController } = require('../controllers');

router.post('/register', authValidation.registerValidation, authController.createUsers);
router.post('/login', authValidation.LoginValidation, authController.getUser);

module.exports = router;