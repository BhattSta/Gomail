const Joi = require('joi');
const validateRequest = require('../utils/requestValidation');

async function sendingMailValidation(req, res, next) {
    // console.log(req.body);
    const mails = {
        from: Joi
            .string()
            .optional()
            .required(),

        to: Joi
            .string()
            .optional()
            .required(),

        subject: Joi
            .string()
            .trim()
            .required(),

        message: Joi
            .string()
            .trim()
            .required(),

        attachments: Joi
            .optional(),

        status: Joi
            .string()
            .optional(),

        counter: Joi
            .number()
            .optional(),

        isDeleted: Joi
            .boolean()
            .optional(),
    };
    validateRequest(req, res, next, Joi.object(mails));
}

module.exports = {
    sendingMailValidation,
};