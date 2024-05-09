const express = require("express")

const { getAllUsers, getUerDetailsById, getUerDetailsByUsername, getUerDetailsTokenless, checkUsername, followUser, unfollowUser, authenticate2FA, update2FA, enable2FA, disable2FA, verifyUserAccount, resendVerificationToken, updateProfile, updateEmail, updatePassword, updateUsername } = require('../../controllers');
const {
  validate,
  two_fa,
  update_profile,
  email,
  update_password,
  update_username,
  authenticate
} = require("../../middlewares");


const user2vRoutes = express.Router();

// 
user2vRoutes.get("/all", getAllUsers);
user2vRoutes.get("/id/:id", authenticate, getUerDetailsById);
user2vRoutes.get("/username/:username", authenticate, getUerDetailsByUsername);
user2vRoutes.get("/username/tl/:username", getUerDetailsTokenless);

// 
user2vRoutes.post("/username/check", checkUsername)
user2vRoutes.post("/follow-user", authenticate, followUser);
user2vRoutes.post("/unfollow-user", authenticate, unfollowUser);

// 2FA
user2vRoutes.post("/:userId/2fa", authenticate, update2FA);
user2vRoutes.post("/:userId/2fa/authenticate", validate(two_fa), authenticate, authenticate2FA);
user2vRoutes.post("/:userId/2fa/enable", validate(two_fa), authenticate, enable2FA);
user2vRoutes.post("/:userId/2fa/disable", validate(two_fa), authenticate, disable2FA);

// Verification
user2vRoutes.post("/:userId/verification/verify/:verificationToken", authenticate, verifyUserAccount)
user2vRoutes.post("/:userId/verification/resend-verification-token", authenticate, resendVerificationToken)

// 
user2vRoutes.put("/:id", validate(update_profile), updateProfile);
user2vRoutes.put("/email/:id", validate(email), updateEmail);
user2vRoutes.put("/password/:id", validate(update_password), updatePassword);
user2vRoutes.put("/username/:id", validate(update_username), updateUsername);

module.exports = user2vRoutes;