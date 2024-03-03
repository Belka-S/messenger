const Joi = require('joi');

const { validateBody } = require('../decorators');
const { joiError, regExp } = require('../utils');

const registerSchema = validateBody(
  Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().pattern(regExp.EMAIL.pattern).required().error(joiError.email),
    password: Joi.string().min(6).required().error(joiError.password),
  }),
);

const loginSchema = validateBody(
  Joi.object({
    email: Joi.string().email(regExp.EMAIL.pattern).required().error(joiError.email),
    password: Joi.string().min(6).required().error(joiError.password),
  }),
);

const updateSchema = validateBody(
  Joi.object({
    name: Joi.string().min(4),
    email: Joi.string().pattern(regExp.EMAIL.pattern).error(joiError.email),
    whatsApp: Joi.string().pattern(regExp.PHONE.pattern).allow(''),
    telegram: Joi.string().pattern(regExp.TELEGRAM.pattern).allow(''),
    location: Joi.string().pattern(regExp.ADDRESS.pattern).allow(''),
    socialLink: Joi.string().pattern(regExp.HTTP.pattern).allow(''),
    birthday: Joi.string().pattern(regExp.DATE.pattern).allow(''),
    about: Joi.string().allow(''),
  }),
);

const verifySchema = validateBody(
  Joi.object({
    email: Joi.string().pattern(regExp.EMAIL.pattern).error(joiError.email),
    verificationCode: Joi.number().required(),
  }),
);

const forgotSchema = validateBody(
  Joi.object({
    email: Joi.string().email(regExp.EMAIL.pattern).required().error(joiError.email),
  }),
);

const resetSchema = validateBody(
  Joi.object({
    id: Joi.string().required(),
    pwdToken: Joi.string().required(),
    newPass: Joi.string().min(6).required().error(joiError.password),
    confirmPass: Joi.any()
      .equal(Joi.ref('newPass'))
      .required()
      .label('Confirm password')
      .error(joiError.password),
    // .messages({ 'any.only': '{{#label}} does not match' }),
  }),
);

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
  verifySchema,
  forgotSchema,
  resetSchema,
};
