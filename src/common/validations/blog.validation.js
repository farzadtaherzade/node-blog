const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

const createBlogSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  category: Joi.string()
    .min(5)
    .required()
    .custom((value, helper) => {
      if (!isValidObjectId(value)) {
        throw new Error("not valid id");
      }
      return value;
    }),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().min(3).optional(),
  category: Joi.string()
    .min(5)
    .custom((value, helper) => {
      if (!isValidObjectId(value)) {
        throw new Error("not valid id");
      }
      return value;
    })
    .optional(),
});

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};
