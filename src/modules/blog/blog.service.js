const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const BlogMessage = require("./blog.messages");
const BlogModel = require("./blog.model");
const { default: slugify } = require("slugify");
const { deleteFile } = require("../../common/utils/functions");

class BlogService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = BlogModel;
  }
  async create(data) {
    const slug = slugify(data.title, { replacement: "-", lower: true });
    const result = await this.#model.create({ ...data, slug });

    if (!result)
      throw new createHttpError.InternalServerError(BlogMessage.BlogNotCreate);
    return result;
  }
  async findAll() {
    const results = await this.#model.find({});
    return results;
  }
  async find(slug) {
    const result = await this.findBlog(slug);
    return result;
  }
  async update(data, slug, author) {
    const blog = await this.findBlog(slug);
    if ("title" in data) {
      const newSlug = slugify(data.title, { replacement: "-", lower: true });
      data = { ...data, slug: newSlug };
    }
    const updateResult = await this.#model.updateOne(
      { _id: blog._id, author },
      { $set: data }
    );
    if (updateResult.matchedCount === 0) {
      throw new createHttpError.Unauthorized(BlogMessage.YouNotAllowd);
    }
    if (updateResult.modifiedCount === 0)
      throw new createHttpError.InternalServerError(BlogMessage.BlogNotUpdate);

    if ("cover" in data) {
      deleteFile(blog.cover);
    }
    return updateResult;
  }
  async delete(slug, author) {
    const blog = await this.findBlog(slug);
    const deleteResult = await this.#model.deleteOne({ _id: blog._id, author });
    if (deleteResult.deletedCount === 0)
      throw new createHttpError.InternalServerError(BlogMessage.BlogNotDelete);

    deleteFile(blog.cover);
    return deleteResult;
  }

  async findBlog(slug) {
    const result = await this.#model.findOne({ slug });
    console.log("dsaihd");
    if (!result) throw new createHttpError.NotFound(BlogMessage.BlogNotFound);
    return result;
  }
}

module.exports = new BlogService();
