const { Schema, model, Types } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 10, maxLength: 250 },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 2500,
    },
    slug: { type: String, required: true, unique: true },
    category: { type: Types.ObjectId, required: false },
    cover: { type: String, required: true },
    author: { type: Types.ObjectId, required: true },
    published: { type: Boolean, default: false },
    // comments: {type:CommentSchema}
  },
  { timestamps: true }
);

const BlogModel = model("blog", BlogSchema);
module.exports = BlogModel;
