const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const CategoryModel = model("category", CategorySchema);
module.exports = CategoryModel;
