const Joi = require('joi');

const { validateBody } = require('../decorators');
const { joiError, regExp } = require('../utils');

const addSchema = validateBody(
  Joi.object({
    id: Joi.string().required(),
    createdAt: Joi.string().required(),
    owner: Joi.string().pattern(regExp.EMAIL.pattern).required().error(joiError.email),
    partner: Joi.string().pattern(regExp.EMAIL.pattern).required().error(joiError.email),
    message: Joi.string().required(),
  }),
);

const updateSchema = validateBody(
  Joi.object({
    id: Joi.string().required(),
    createdAt: Joi.string(),
    owner: Joi.string().pattern(regExp.EMAIL.pattern).error(joiError.email),
    partner: Joi.string().pattern(regExp.EMAIL.pattern).error(joiError.email),
    message: Joi.string(),
  }),
);

module.exports = { addSchema, updateSchema };
