const Post = require("../models/postModel");
const User = require("../models/userModel");
const response = require("../utils/response");
const slugify = require("slugify");
const ObjectId = require("mongodb").ObjectId;

/**
 * Create new Post
 *
 * @param {*} req
 * @param {*} res
 * @returns new Post
 */
const createNewPost = async (req, res) => {
  try {
    // Check if user does not exist
    const user = await User.findOne({ _id: req.body.authorizedUser._id });
    if (!user) {
      return response(
        req,
        res,
        400,
        true,
        false,
        "User creating this post does not exist",
      );
    }

    const slugLength = 35;
    const uuid = Math.floor(Math.random() * 100000);

    const t = () => {
      const tl = req.body.title;
      let slg = null;
      if (tl.length > slugLength) {
        slg = tl.slice(0, slugLength) + uuid;
        return slg;
      } else return tl + uuid;
    };

    const newPost = await Post.create({
      ...req.body,
      slug: slugify(t(), { lower: true }),
      authorizedUser: undefined,
    });

    return response(req, res, 201, false, newPost._doc.slug, "Post created");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Get single post using the post slug as the query param
 *
 * @param {*} req
 * @param {*} res
 * @returns post
 */
const getHomePosts = async (req, res) => {
  var options = {
    // sort: { date: -1 },
    // lean: true,
    // offset: 20,
    populate: "author",
    select: "-email -password -reset_token -reset_token_ttl",
    limit: 20,
    page: 1,
  };

  const post = await Post.paginate({}, options, function (err, result) {
    if (err) {
      return response(req, res, 500, true, false, "Error occur");
    }
    return response(req, res, 200, false, { ...result }, "Post retrieve");
  });
  // .populate(
  //   "author",
  //   "-email -password -reset_token -reset_token_ttl",
  // )

  // if (!post) {
  //   return response(req, res, 404, true, false, "Post not found");
  // }
};

/**
 * Get single post using the post slug as the query param
 *
 * @param {*} req
 * @param {*} res
 * @returns post
 */
const getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "_id",
    );
    console.log({ user });
    if (!user) {
      return response(req, res, 404, true, false, "Post not found");
    }
    const posts = await Post.find({
      author: ObjectId(user._id),
    })
      .populate("author", "-email -password -reset_token -reset_token_ttl")
      .populate({
        path: "comments",
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: "commentor", select: "name username avatar" },
      });

    if (!posts) {
      return response(req, res, 404, true, false, "Post not found");
    }

    return response(req, res, 200, false, posts, "Post retrieve");
  } catch (error) {
    return response(req, res, 500, true, false, "Internal Server Error");
  }
};

/**
 * Get single post using the post slug as the query param
 *
 * @param {*} req
 * @param {*} res
 * @returns post
 */
const getSinglePost = async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
  })
    .populate("author", "-email -password -reset_token -reset_token_ttl")
    .populate({
      path: "comments",
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: "commentor", select: "name username avatar" },
    });

  if (!post) {
    return response(req, res, 404, true, false, "Post not found");
  }

  return response(req, res, 200, false, post, "Post retrieve");
};

/**
 * Update Post
 *
 * @param {*} req
 * @param {*} res
 * @returns post
 */
const updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      {
        $set: { ...req.body, authorizedUser: undefined },
      },
      { new: true },
    );

    if (!post) return response(req, res, 404, true, false, "Post not found");

    return response(req, res, 200, false, post, "Post updated");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Delete a post by slug
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) return response(req, res, 404, true, false, "Post not found");

    return response(req, res, 200, false, true, "Post deleted");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

module.exports = {
  createNewPost,
  getSinglePost,
  getHomePosts,
  updatePost,
  deletePost,
  getUserPosts,
};
