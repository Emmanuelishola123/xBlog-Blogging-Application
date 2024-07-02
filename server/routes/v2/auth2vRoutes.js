const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../../controllers");
const {
  register,
  validate,
  login,
  forget_password,
  reset_password,
} = require("../../middlewares");
const { oAuthFlow } = require("../../controllers/authControllers");
require("../../services/passportGoogle");
require("../../services/passportGithub");
// const keys = require("../../config");

const auth2vRoutes = express.Router();

/**
 * @GET
 */
auth2vRoutes.get("/google", passport.authenticate("google"));
auth2vRoutes.get(
  "/google/callback",
  passport.authenticate("google"),
  oAuthFlow
);
//
auth2vRoutes.get("/github", passport.authenticate("github"));
auth2vRoutes.get(
  "/github/callback",
  passport.authenticate("github"),
  oAuthFlow
);

/**
 * @POST
 */
auth2vRoutes.post("/sign-up", validate(register), registerUser);
auth2vRoutes.post("/sign-in", validate(login), loginUser);
auth2vRoutes.post(
  "/forget-password",
  validate(forget_password),
  forgotPassword
);
auth2vRoutes.post(
  "/reset-password/:resetToken",
  validate(reset_password),
  resetPassword
);

module.exports = auth2vRoutes;
