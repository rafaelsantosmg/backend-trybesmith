import Joi from 'joi';

export const validateProduct = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

export const validateUser = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

export const validateLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateProductIds = Joi.object().keys({
  productsIds: Joi.array().items(Joi.number().greater(0).required()).required().messages({
    'array.includesRequiredUnknowns': '"productsIds" must include only numbers',
  }),
  user: Joi.object(),
});