const Joi = require('joi');

const { validateBody } = require('../decorators');

const addSchema = validateBody(
  Joi.object({
    element: Joi.string().required(),
  }),
);

const updateSchema = validateBody(
  Joi.object({
    element: Joi.string(),
  }),
);

module.exports = { addSchema, updateSchema };
