const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const response = require("../utils/response");

/**
 * Add comment to a post
 *
 * @param {*} req
 * @param {*} res
 * @returns new Post
 */
const addCommentToPost = async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      commentor: req.body.authorizedUser._id,
    });
    const post = await Post.findOneAndUpdate(
      { slug: req.params.postSlug },
      {
        $push: { comments: newComment._doc._id },
      },
      { new: true },
    );

    if (!post) return response(req, res, 404, true, false, "Post not found");

    return response(req, res, 201, false, { post, newComment }, "Post created");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Delete comment
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteComment = async (req, res) => {
  try {
    await Comment.findOneAndDelete({
      _id: req.params.commentId,
    });
    await Post.findOneAndUpdate(
      { slug: req.params.postSlug },
      { $pull: { comments: req.params.commentId } },
      { new: true },
    );

    return response(req, res, 200, false, true, "Comment deleted");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * React to a comment
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const reactToComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId },
      { $push: { reactions: req.body.authorizedUser._id } },
    );

    if (!comment)
      return response(req, res, 404, true, false, "Comment not found");
    return response(
      req,
      res,
      200,
      false,
      comment._doc.reactions,
      "Reacted to comment",
    );
  } catch (error) {
    return response(req, res, 500, true, flse, error.message);
  }
};

module.exports = {
  addCommentToPost,
  deleteComment,
  reactToComment,
};
