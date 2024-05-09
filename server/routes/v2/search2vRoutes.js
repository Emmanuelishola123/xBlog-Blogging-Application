const express = require("express");
const { searchAll, searchForPost, searchForUser, searchForComment } = require("../../controllers");


const search2vRoutes = express.Router()


search2vRoutes.get("/", searchAll);
search2vRoutes.get("/post", searchForPost);
search2vRoutes.get("/user", searchForUser);
search2vRoutes.get("/comment", searchForComment);



module.exports = search2vRoutes;
