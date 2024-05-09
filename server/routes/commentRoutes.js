const express = require("express")
const { addCommentToPost, reactToComment, deleteComment } = require("../controllers/commentControllers");
const authenticate = require("../middlewares/authenticate");



const commentRoutes = express.Router()

/**
 * @GET
 */
// commentRoutes.get("/:slug", getSinglePost);

/**
 * @POST
 */
commentRoutes.post("/:postSlug", authenticate, addCommentToPost);

/**
 * @UPDATE
 */
commentRoutes.put("/:commentId", authenticate, reactToComment)

/**
 * @DELETE
 */
commentRoutes.delete("/:postSlug/:commentId", authenticate, deleteComment)


module.exports = commentRoutes;