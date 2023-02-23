const Joi = require('joi');
const validateRequest = require('../utils/requestValidation');

async function registerValidation(req, res, next) {
  const register = {
    name: Joi.string().required().min(3).max(40).lowercase().trim(),
    mobile: Joi.string().pattern(/^[6-9]\d{9}$/, "Mobile Number Should Be Of 10 Digits Only"),
    role: Joi.string().valid('user', 'admin').trim(),
    email: Joi.string().trim().email().required().lowercase().pattern(/^[a-zA-Z0-9]+@(gomail\.com)$/, "Suffix It Should Be @gomail.com Only"),
    password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{4,}$/, "Password It Must Contain Atleast 1 uppercase, 1 lowecase, 1 digit & 1 special character"),
    confirmpassword: Joi.string().custom((value, helper) => {
      if (value !== req.body.password) {
        return helper.message('Password and Confirm Password are not same');
      }
    })
  };
  validateRequest(req, res, next, Joi.object(register));
}

confirmPassword: Joi.string()
  .custom((value, helper) => {
    if (value !== req.body.password) {
      return helper.message('Password and Confirm Password are not same');
    }
  });

async function LoginValidation(req, res, next) {
  const Login = {
    email: Joi.string().trim().email().required().lowercase(),
    password: Joi.string().required(),
  };
  validateRequest(req, res, next, Joi.object(Login));
}

module.exports = {
  registerValidation,
  LoginValidation
};