const express = require("express")
const {
  createNewPost,
  getSinglePost,
  getHomePosts,
  updatePost,
  deletePost,
  getUserPosts
} = require("../controllers/postControllers");
const authenticate = require("../middlewares/authenticate");


const postRoutes = express.Router()

/**
 * @GET
 */
postRoutes.get("/", getHomePosts);
postRoutes.get("/user/:username", getUserPosts);
postRoutes.get("/:slug", getSinglePost);
/**
 * @POST
 */
postRoutes.post("/", authenticate, createNewPost);

/**
 * @UPDATE
 */
postRoutes.put("/:slug", authenticate, updatePost);

/**
 * @DELETE
 */
postRoutes.delete("/:slug", authenticate, deletePost);

module.exports = postRoutes;
