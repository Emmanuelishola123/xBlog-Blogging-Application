const express = require("express");
const {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  checkUsername,
} = require("../controllers");
const {
  register,
  validate,
  login,
  forget_password,
  reset_password,
} = require("../middlewares");



const authRoutes = express.Router()

/**
 * @POST
 */
authRoutes.post("/register", validate(register), registerUser);
authRoutes.post("/username", checkUsername)
authRoutes.post("/login", validate(login), loginUser);
authRoutes.post("/forget-password", validate(forget_password), forgotPassword);
authRoutes.post("/reset-password/:resetToken", validate(reset_password), resetPassword);

module.exports = authRoutes;