const Joi = require('joi');
const validateRequest = require('../utils/requestValidation');

async function registerValidation(req, res, next) {
  const register = {
    name: Joi
      .string()
      .required()
      .min(3)
      .max(40)
      .lowercase()
      .trim()
      .pattern(/^([a-z]+\s)*[a-z]+$/, `validation as digits and consecutive spaces not allowed in`),

    mobile: Joi
      .string()
      .required()
      .pattern(/^[6-9]\d{9}$/, "validation as mobile number should be of 10 digits only and there should be no + sign or not any country code in"),

    role: Joi
      .string()
      .valid('user', 'admin')
      .trim(),

    email: Joi
      .string()
      .trim()
      .email()
      .required()
      .lowercase()
      .pattern(/^[a-zA-Z0-9]+@(gomail\.com)$/, "validation, the suffix should be @gomail.com only in"),

    password: Joi
      .string()
      .required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{4,}$/, "validation as password must contain atleast 1 uppercase, 1 lowecase, 1 digit & 1 special character in"),

    confirmpassword: Joi
      .string()
      .custom((value, helper) => {
        if (value !== req.body.password) {
          return helper.message('Password and Confirm Password are not same');
        }
      })
  };
  validateRequest(req, res, next, Joi.object(register));
}

async function LoginValidation(req, res, next) {
  const Login = {
    email: Joi
      .string()
      .trim()
      .email()
      .required()
      .lowercase(),

    password: Joi
      .string()
      .required(),
  };
  validateRequest(req, res, next, Joi.object(Login));
}

module.exports = {
  registerValidation,
  LoginValidation
};