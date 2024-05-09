const express = require("express");
const {
  getHomePosts,
  getUserPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost
} = require("../../controllers");
const { authenticate } = require("../../middlewares");


const post2vRoutes = express.Router()


post2vRoutes.get("/", getHomePosts);
post2vRoutes.get("/user/:username", getUserPosts);
post2vRoutes.get("/:slug", getSinglePost);
post2vRoutes.post("/", authenticate, createNewPost);
post2vRoutes.put("/:slug", authenticate, updatePost);
post2vRoutes.delete("/:slug", authenticate, deletePost);



module.exports = post2vRoutes;
