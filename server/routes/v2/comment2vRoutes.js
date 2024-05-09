const express = require("express")
const {
    addCommentToPost,
    reactToComment,
    deleteComment
} = require("../../controllers");
const { authenticate } = require("../../middlewares");


const comment2vRoutes = express.Router()

/**
 * @GET
 */
// comment2vRoutes.get("/:slug", getSinglePost);

comment2vRoutes.post("/:postSlug", authenticate, addCommentToPost);
comment2vRoutes.put("/:commentId", authenticate, reactToComment)
comment2vRoutes.delete("/:postSlug/:commentId", authenticate, deleteComment)


module.exports = comment2vRoutes;