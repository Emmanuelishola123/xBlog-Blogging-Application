const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const response = require("../utils/response");
const ObjectId = require("mongodb").ObjectId

// var options = {
//   select: 'title date author',
//   sort: { date: -1 },
//   populate: 'author',
//   lean: true,
//   offset: 20,
//   limit: 10,
// };

/**
 * Search All
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const searchAll = async (req, res) => {
  try {
    const { q, category, sortBy, userId } = req.query;
    console.log(req.query);

    const searchQuery = new RegExp(q, "i");

    let match = {};
    let searchResult = {};

    if (q) {
      switch (category) {
        case "posts":
        case "null":
        case "":
          match.$or = [{ title: searchQuery }, { content: searchQuery }];
          const posts = await Post.aggregate([{ $match: match }]);
          searchResult = { category: "posts", data: posts };
          break;
        case "users":
          match.$or = [{ name: searchQuery }, { username: searchQuery }];
          const users = await User.aggregate([{ $match: match }]);
          searchResult = { category: "users", data: users };
          break;
        case "comments":
          match.$or = [{ comment: searchQuery }, { commentor: searchQuery }];
          const comments = await Comment.aggregate([{ $match: match }]);
          searchResult = { category: "comments", data: comments };
          break;
        case "my-posts":
          match.$and = [
            { author: ObjectId(userId) },
            { $or: [{ title: searchQuery }, { content: searchQuery }] },
          ];
          const myPosts = await Post.aggregate([{ $match: match }]);
          searchResult = { category: "my-posts", data: myPosts };
          break;
        case "my-comments":
          match.$and = [
            { author: ObjectId(userId) },
            { $or: [{ comment: searchQuery }, { commentor: searchQuery }] },
          ];
          const myComments = await Comment.aggregate([{ $match: match }]);
          searchResult = { category: "my-comments", data: myComments };
          break;
        default:
          // match.$or = [{ title: searchQuery }, { content: searchQuery }];
          break;
      }
    }

    // const posts = await Post.aggregate([{ $match: match }]);

    if (!searchResult) {
      return response(req, res, 404, true, false, "No post found");
    }
    return response(req, res, 200, false, searchResult, "Search results");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Search Post
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const searchForPost = async (req, res) => {
  try {
    const { q, category, sortBy, authorId } = req.query;
    const searchQuery = new RegExp(q, "i");

    let match = {};

    if (q) {
      match.$or = [{ title: searchQuery }, { content: searchQuery }];
    }

    // if (category && category === "my-posts") {
    //   if (authorId) {
    //     match.author = authorId;
    //   }
    // }

    // if (sortBy) {
    //   if (sortBy === "relevant") {
    //     match.comments = 1;
    //     match.reactions = 1;
    //     match.shares = 1;
    //     match.bookmarks = 1;
    //   } else if (sortBy === "newest") {
    //     match.createdAt = 1;
    //   } else if (sortBy === "oldest") {
    //     match.createdAt = -1;
    //   }
    // }

    console.log(match, req.query);

    const posts = await Post.aggregate([{ $match: match }]);

    if (!posts) {
      return response(req, res, 404, true, false, "No post found");
    }
    return response(req, res, 200, false, posts, "Search results");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Search Comment
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const searchForComment = async (req, res) => {
  try {
    const { q, category, sortBy, authorId } = req.query;
    const searchQuery = new RegExp(q, "i");

    let match = {};

    if (q) {
      match.comment = searchQuery;
    }

    if (category && category === "my-comments" && authorId) {
      match.commentor = authorId;
    }

    if (sortBy) {
      if (sortBy === "relevant") {
        match.reactions = 1;
      } else if (sortBy === "newest") {
        match.createdAt = 1;
      } else if (sortBy === "oldest") {
        match.createdAt = -1;
      }
    }

    console.log(match, req.query);

    const comments = await Comment.aggregate([{ $match: match }]);

    if (!comments) {
      return response(req, res, 404, true, false, "No comment found");
    }

    return response(req, res, 200, false, comments, "Search results");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Search User
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const searchForUser = async (req, res) => {
  try {
    const { q, sortBy, authorId } = req.query;
    const searchQuery = new RegExp(q, "i");

    let match = {};

    if (q) {
      match.$or = [{ username: searchQuery }, { name: searchQuery }];
    }

    // if (category & (category === "my-posts")) {
    //   if (authorId) {
    //     match.author = authorId;
    //   }
    // }

    if (sortBy) {
      if (sortBy === "relevant") {
        match.followers = 1;
      } else if (sortBy === "newest") {
        match.createdAt = 1;
      } else if (sortBy === "oldest") {
        match.createdAt = -1;
      }
    }

    console.log({ match }, req.query);

    const users = await User.aggregate([{ $match: match }]);

    if (!users) {
      return response(req, res, 404, true, false, "No user found");
    }

    return response(req, res, 200, false, users, "Search results");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

module.exports = {
  searchAll,
  searchForPost,
  searchForUser,
  searchForComment,
};
