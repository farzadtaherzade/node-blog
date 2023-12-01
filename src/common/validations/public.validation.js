const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

const checkMongoIdSchema = Joi.object({
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
  checkMongoIdSchema,
};
