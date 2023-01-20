const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const price = Joi.number().integer();
const quantity = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  quantity: quantity.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  quantity: quantity,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
