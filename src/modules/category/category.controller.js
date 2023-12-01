const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const CategoryMessage = require("./category.messages");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../../common/validations/category.validation");
const {
  checkMongoIdSchema,
} = require("../../common/validations/public.validation");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }
  async create(req, res, next) {
    try {
      const { name } = await createCategorySchema.validateAsync(req.body);
      await this.#service.create(name);
      return res.status(201).json({
        message: CategoryMessage.CategoryCreatedSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async findAll(req, res, next) {
    try {
      const categories = await this.#service.findAll();
      return res.status(200).json({
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { name, id } = await updateCategorySchema.validateAsync(req.body);
      await this.#service.update({ name, id });
      return res.status(200).json({
        message: CategoryMessage.CategoryUpdatedSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = await checkMongoIdSchema.validateAsync(req.body);
      await this.#service.remove(id);
      return res.status(200).json({
        message: CategoryMessage.CategorySuccessfullyDeleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
