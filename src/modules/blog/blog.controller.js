const autoBind = require("auto-bind");
const blogService = require("./blog.service");
const BlogMessage = require("./blog.messages");
const {
  createBlogSchema,
  updateBlogSchema,
} = require("../../common/validations/blog.validation");

class BlogController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = blogService;
  }
  async create(req, res, next) {
    try {
      const cover = req.file.filename;
      const { title, description, category } =
        await createBlogSchema.validateAsync(req.body);
      await this.#service.create({
        title,
        description,
        category,
        cover,
        author: req.user._id,
      });
      return res.status(201).json({
        message: BlogMessage.BlogCreateSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const { slug } = req.params;
      const blog = await this.#service.find(slug);
      return res.status(200).json({
        blog,
      });
    } catch (error) {
      next(error);
    }
  }
  async findAll(req, res, next) {
    try {
      const blogs = await this.#service.findAll();
      return res.status(200).json({
        blogs,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { title, description, category } =
        await updateBlogSchema.validateAsync(req.body);
      const { slug } = req.params;
      const authorId = req.user._id;

      await this.#service.update(
        { title, description, category },
        slug,
        authorId
      );
      return res.status(200).json({
        message: BlogMessage.BlogUpdateSuccessfully,
        blog,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { slug } = req.params;
      const authorId = req.user._id;
      await this.#service.delete(slug, authorId);
      return res.status(200).json({
        message: BlogMessage.BlogDeleteSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BlogController();
