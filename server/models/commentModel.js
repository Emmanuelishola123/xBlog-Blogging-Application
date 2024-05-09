const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const commentSchema = new mongoose.Schema(
  {
    commentor: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true },
    comment: { type: String, require: true },
    reactions: { type: [mongoose.Schema.Types.ObjectId], ref: "Users" },
  },
  { timestamps: true },
);

commentSchema.plugin(mongoosePaginate)

const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;
