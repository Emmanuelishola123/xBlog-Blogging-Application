const express = require("express")
const {
  getUerDetailsByUsername,
  getUerDetailsById,
  getAllUsers,
  updateProfile,
  updateEmail,
  updatePassword,
  updateUsername,
  followUser,
  unfollowUser,
  getUerDetailsTokenless
} = require("../controllers/userControllers");

const authenticate = require("../middlewares/authenticate");
const {
  update_profile,
  validate,
  update_password,
  email,
  update_username,
} = require("../middlewares/validator");


const userRoutes = express.Router();


/**
 * @GET
 */
userRoutes.get("/all", getAllUsers);
userRoutes.get("/id/:id", authenticate, getUerDetailsById);
userRoutes.get("/username/:username", authenticate, getUerDetailsByUsername);
userRoutes.get("/username/tl/:username", getUerDetailsTokenless);

/**
 * @POST
 */
userRoutes.post("/follow-user", authenticate, followUser);
userRoutes.post("/unfollow-user", authenticate, unfollowUser);

/**
 * @UPDATE
 */
userRoutes.put("/:id", validate(update_profile), updateProfile);
userRoutes.put("/email/:id", validate(email), updateEmail);
userRoutes.put("/password/:id", validate(update_password), updatePassword);
userRoutes.put("/username/:id", validate(update_username), updateUsername);



module.exports = userRoutes;
