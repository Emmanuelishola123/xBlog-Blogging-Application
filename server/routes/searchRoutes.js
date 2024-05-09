const express = require("express")
const { searchAll, searchForPost, searchForUser, searchForComment } = require("../controllers/searchControllers");


const searchRoutes = express.Router()

/**
 * @GET
 */
searchRoutes.get("/", searchAll);
searchRoutes.get("/post", searchForPost);
searchRoutes.get("/user", searchForUser);
searchRoutes.get("/comment", searchForComment);



module.exports = searchRoutes;
