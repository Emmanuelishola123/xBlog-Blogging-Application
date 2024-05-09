const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    banner: { type: String, require: false },
    content: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comments" },
    shares: { type: Number },
    reactions: { type: [mongoose.Schema.Types.ObjectId], ref: "Users" },
    bookmarks: { type: [mongoose.Schema.Types.ObjectId], ref: "Users" },
    tags: {
      type: [String],
    },
    update_at: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true },
);

postSchema.plugin(mongoosePaginate)

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
