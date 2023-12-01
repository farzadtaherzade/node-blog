const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const CategoryMessage = require("./category.messages");
const CategoryModel = require("./category.model");

class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }
  async create(name) {
    const category = await this.#model.create({ name });
    if (!category)
      throw new createHttpError.InternalServerError(
        CategoryMessage.CategoryNotCreated
      );
    return category;
  }
  async findAll() {
    const categories = await this.#model.find();
    return categories;
  }

  async update(payload) {
    const result = await this.#model.updateOne(
      { _id: payload.id },
      {
        $set: {
          name: payload.name,
        },
      }
    );
    if (result.modifiedCount === 0)
      throw new createHttpError.InternalServerError(
        CategoryMessage.CategoryNotUpdated
      );
    return result;
  }
  async remove(id) {
    const result = await this.#model.deleteOne({ _id: id });
    if (result.deletedCount === 0)
      throw new createHttpError.InternalServerError(
        CategoryMessage.CategoryNotRemoved
      );
    return result;
  }
}

module.exports = new CategoryService();
