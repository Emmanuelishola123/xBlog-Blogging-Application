const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} = require("../../controllers");
const {
  register,
  validate,
  login,
  forget_password,
  reset_password,
} = require("../../middlewares");


const auth2vRoutes = express.Router()


// const passportGoogle = require("../services/passportGoogle");
// const passportGithub = require("../services/passportGithub");

/**
 * @GET
 */
// auth2vRoutes.get("/google", passportGoogle.authenticate("google"));
// auth2vRoutes.get("/github", passportGithub.authenticate("github"));

/**
 * @POST
 */
auth2vRoutes.post("/sign-up", validate(register), registerUser);
auth2vRoutes.post("/sign-in", validate(login), loginUser);
auth2vRoutes.post("/forget-password", validate(forget_password), forgotPassword);
auth2vRoutes.post("/reset-password/:resetToken", validate(reset_password), resetPassword);

module.exports = auth2vRoutes;