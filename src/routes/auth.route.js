const express = require('express');
const router = express.Router();
const {createUserValidation} = require('../validations/auth.validation');
const UserController = require('../controllers/auth.controller');


router.post('/userRegistration', createUserValidation, UserController.createUsers);
router.post('/userLogin', UserController.getUser);

module.exports = router;