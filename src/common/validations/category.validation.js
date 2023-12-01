const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).required(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).required(),
  id: Joi.string()
    .min(5)
    .required()
    .custom((value, helper) => {
      if (!isValidObjectId(value)) {
        throw new Error("not valid id");
      }
      return value;
    }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
