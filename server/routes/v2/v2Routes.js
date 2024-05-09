const express = require("express")
const auth2vRoutes = require("./auth2vRoutes")
const user2vRoutes = require("./user2vRoutes")
const post2vRoutes = require("./post2vRoutes")
const comment2vRoutes = require("./comment2vRoutes")
const search2vRoutes = require("./search2vRoutes")

// const upload2vRoutes = require("./upload2vRoutes")

const v2Routes = express.Router()

v2Routes.use("/auth", auth2vRoutes)
v2Routes.use("/user", user2vRoutes)
v2Routes.use("/post", post2vRoutes)
v2Routes.use("/comment", comment2vRoutes)
v2Routes.use("/search", search2vRoutes)

// v2Routes.use("/upload", upload2vRoutes)

module.exports = v2Routes;