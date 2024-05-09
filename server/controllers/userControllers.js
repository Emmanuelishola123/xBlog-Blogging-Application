const User = require("../models/userModel");
const response = require("../utils/response");
const keys = require("../config");
const bcrypt = require("bcryptjs");
const { encrypt } = require("../utils/encryption");
const { signJWT } = require("../utils/jwt");
const connection = require("../utils/connection");
const { generateOTP, generateId, extendPeriod } = require("../utils");
const { sendEmail } = require("../services");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns user details
 */
const getUerDetailsById = async (req, res) => {
  try {
    const userDetails = await User.findOne(
      { _id: req.params.id },
      {
        password: 0,
        __v: 0,
        reset_token: 0,
        reset_token_ttl: 0,
      },
    );
    if (!userDetails) {
      return response(req, res, 404, true, false, "No user profile found");
    }

    return response(
      req,
      res,
      200,
      false,
      {
        ...userDetails._doc,
        connectionLevel: connection(req.body.authorizedUser, userDetails),
      },
      "User details retrieve successfully",
    );
  } catch (error) {
    console.log({ error });
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns user details
 */
const getUerDetailsByUsername = async (req, res) => {
  try {
    const userDetails = await User.findOne(
      { username: req.params.username },
      {
        password: 0,
        __v: 0,
        reset_token: 0,
        reset_token_ttl: 0,
      },
    );
    if (!userDetails) {
      return response(req, res, 404, true, false, "No user profile found");
    }

    return response(
      req,
      res,
      200,
      false,
      {
        ...userDetails._doc,
        connectionLevel: connection(req.body.authorizedUser, userDetails),
      },
      "User details retrieve successfully",
    );
  } catch (error) {
    console.log({ error });
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns user details
 */
const getUerDetailsTokenless = async (req, res) => {
  try {
    const userDetails = await User.findOne(
      { username: req.params.username },
      {
        password: 0,
        __v: 0,
        reset_token: 0,
        reset_token_ttl: 0,
      },
    );
    if (!userDetails) {
      return response(req, res, 404, true, false, "No user profile found");
    }

    return response(
      req,
      res,
      200,
      false,
      userDetails,
      "User details retrieve successfully",
    );
  } catch (error) {
    console.log({ error });
    return response(req, res, 500, true, false, error.message);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns list of all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return response(req, res, 200, false, users, "Users retrieve successfully");
  } catch (error) {
    console.log({ error });
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Update User Profile
 *
 * @param {*} req
 * @param {*} res
 */
const updateProfile = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return response(req, res, 404, true, false, "No user found");
    const updatedProfile = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      },
    );

    // Create JWT payload to generate a new token
    const jwt_payload = {
      _id: encrypt(updatedProfile?._id?.toString()),
      name: encrypt(updatedProfile?.name?.toString()),
      username: encrypt(updatedProfile?.username?.toString()),
      email: encrypt(updatedProfile?.email?.toString()),
    };

    // Generate JWT token
    const token = await signJWT(jwt_payload);

    updatedProfile._doc.token = token;
    delete updatedProfile._doc.__v;
    delete updatedProfile._doc.password;
    delete updatedProfile._doc.reset_token;
    delete updatedProfile._doc.reset_token_ttl;

    response(
      req,
      res,
      200,
      false,
      updatedProfile,
      "User profile updated successfully",
    );
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Update User Profile
 *
 * @param {*} req
 * @param {*} res
 */
const updateEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return response(req, res, 404, true, false, "No user found");

    const userWithEmail = await User.findOne({ email: req.body.email });
    if (userWithEmail)
      return response(
        req,
        res,
        409,
        true,
        false,
        "There is an account attached with the email",
      );

    const updatedProfile = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      },
    );

    // Create JWT payload to generate a new token
    const jwt_payload = {
      _id: encrypt(updatedProfile?._id?.toString()),
      name: encrypt(updatedProfile?.name?.toString()),
      username: encrypt(updatedProfile?.username?.toString()),
      email: encrypt(updatedProfile?.email?.toString()),
    };

    // Generate JWT token
    const token = await signJWT(jwt_payload);

    updatedProfile._doc.token = token;
    delete updatedProfile._doc.__v;
    delete updatedProfile._doc.password;
    delete updatedProfile._doc.reset_token;
    delete updatedProfile._doc.reset_token_ttl;

    response(
      req,
      res,
      200,
      false,
      updatedProfile,
      "User email updated successfully",
    );
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Updae user password
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return response(req, res, 404, true, false, "No user foundk");

    // Hashed user password
    const salt = bcrypt.genSaltSync(Number(keys.SALT_ROUNDS));
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
      },
      {
        new: true,
      },
    );

    response(req, res, 200, false, {}, "Password updated successfully");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Update User Profile
 *
 * @param {*} req
 * @param {*} res
 */
const updateUsername = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return response(req, res, 404, true, false, "No user found");

    const userWithUsername = await User.findOne({
      username: req.body.username,
    });
    if (userWithUsername)
      return response(req, res, 409, true, false, "Username exist");

    const updatedProfile = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      },
    );

    // Create JWT payload to generate a new token
    const jwt_payload = {
      _id: encrypt(updatedProfile?._id?.toString()),
      name: encrypt(updatedProfile?.name?.toString()),
      username: encrypt(updatedProfile?.username?.toString()),
      email: encrypt(updatedProfile?.email?.toString()),
    };

    // Generate JWT token
    const token = await signJWT(jwt_payload);

    updatedProfile._doc.token = token;
    delete updatedProfile._doc.__v;
    delete updatedProfile._doc.password;
    delete updatedProfile._doc.reset_token;
    delete updatedProfile._doc.reset_token_ttl;

    response(
      req,
      res,
      200,
      false,
      updatedProfile,
      "Username updated successfully",
    );
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Follow user
 *
 * @param {*} req
 * @param {*} res
 */
const followUser = async (req, res) => {
  try {
    const followingUserExist = await User.findOne({
      _id: req.body.following_id,
    });
    if (!followingUserExist)
      return response(
        req,
        res,
        404,
        true,
        false,
        "The user you are trying to follow does not exit",
      );

    // Update follower profile
    const followerUser = await User.findOneAndUpdate(
      { _id: req.body.authorizedUser._id },
      {
        $push: {
          following: req.body.following_id,
        },
      },
      {
        new: true,
      },
    );

    // Update following profile
    const followingUser = await User.findOneAndUpdate(
      { _id: req.body.following_id },
      {
        $push: {
          followers: req.body.authorizedUser._id,
        },
      },
      {
        new: true,
      },
    );

    response(
      req,
      res,
      200,
      false,
      {
        myFollowing: followerUser._doc.following,
        userFollowers: followingUser._doc.followers,
        connectionLevel: connection(req.body.authorizedUser, followingUser),
      },
      `You are now following ${followingUser.username}`,
    );
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

/**
 * Unfollow user
 *
 * @param {*} req
 * @param {*} res
 */
const unfollowUser = async (req, res) => {
  try {
    const followingUserExist = await User.findOne({
      _id: req.body.following_id,
    });
    if (!followingUserExist)
      return response(
        req,
        res,
        404,
        true,
        false,
        "The user you are trying to unfollow does not exit",
      );

    // Update follower profile
    const followerUser = await User.findOneAndUpdate(
      { _id: req.body.authorizedUser._id },
      {
        $pull: {
          following: req.body.following_id,
        },
      },
      {
        new: true,
      },
    );

    // Update following profile
    const followingUser = await User.findOneAndUpdate(
      { _id: req.body.following_id },
      {
        $pull: {
          followers: req.body.authorizedUser._id,
        },
      },
      {
        new: true,
      },
    );

    response(
      req,
      res,
      200,
      false,
      {
        myFollowing: followerUser._doc.following,
        userFollowers: followingUser._doc.followers,
        connectionLevel: connection(req.body.authorizedUser, followingUser),
      },

      `You just unfollow ${followingUser.username}`,
    );
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};



/**
 * Enable User 2FA
 */
const enable2FA = async (req, res) => {
  try {
    const { authToken } = req.body
    const { userId } = req.params

    const user = await User.findById(userId);

    // Check if user exist
    if (!user) {
      return response(req, res, 404, true, false, "User not found!");
    }

    // Re-check if 2FA is disabled
    if (user.is_two_fa_enabled) {
      return response(req, res, 400, true, false, "User already has 2FA enabled!");
    }

    // Check if 2FA is still active (not expired)
    if (!user.two_fa_token || user.two_fa_token_ttl <= new Date()) {
      return response(req, res, 404, true, false, "Invalid OTP or OTP Expired!");
    }


    // Compare auth token
    const match = await bcrypt.compare(authToken, user.two_fa_token);
    console.log({ match })
    if (!match) {
      return response(req, res, 401, true, false, "Incorrect 2FA OTP!");
    }


    user.is_two_fa_enabled = true
    user.two_fa_token = null
    user.two_fa_token_ttl = null
    user.save()

    return response(req, res, 200, false, user, "2FA enabled!");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};


/**
 * Update 2FA User 2FA
 */
const update2FA = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId);

    // Check if user exist
    if (!user) {
      return response(req, res, 404, true, false, "User not found!");
    }

    const otp = generateOTP()
    const salt = bcrypt.genSaltSync(Number(keys.SALT_ROUNDS));
    const hashed2FAToken = bcrypt.hashSync(otp, salt);

    user.two_fa_token = hashed2FAToken
    user.two_fa_token_ttl = extendPeriod(10, 'm')

    user.save()

    // TODO: Send token via email to user

    // TODO: Send 2FA token via email to user
    sendEmail({ body: { otp, hashed2FAToken }, from: 'xBlog <xblog@support.com>', subject: '2FA Authorization', to: user.email })


    return response(req, res, 302, false, null, "Complete 2FA Verification")

  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};



/**
 * Disable User 2FA
 */
const disable2FA = async (req, res) => {
  try {
    const { authToken } = req.body
    const { userId } = req.params

    const user = await User.findById(userId);

    // Check if user exist
    if (!user) {
      return response(req, res, 404, true, false, "User not found!");
    }

    // Re-check if 2FA is enabled
    if (!user.is_two_fa_enabled) {
      return response(req, res, 400, true, false, "User already has 2FA disabled!");
    }

    // Check if 2FA is still active (not expired)
    if (!user.two_fa_token || user.two_fa_token_ttl <= new Date()) {
      return response(req, res, 404, true, false, "Invalid OTP or OTP Expired!");
    }

    // Compare auth token
    const match = await bcrypt.compare(authToken, user.two_fa_token);
    console.log({ match })

    if (!match) {
      return response(req, res, 401, true, false, "Incorrect 2FA OTP!");
    }


    user.two_fa_token = null
    user.two_fa_token_ttl = null
    user.is_two_fa_enabled = false
    user.save()

    return response(req, res, 200, false, user, "2FA disabled!");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};



/**
 * AUthenticate User with 2FA
 */
const authenticate2FA = async (req, res) => {
  try {
    const { authToken } = req.body
    const { userId } = req.params

    const user = await User.findById(userId);

    // Check if user exist
    if (!user) {
      return response(req, res, 404, true, false, "User not found!");
    }
    // Re-check if 2FA is enabled
    if (!user.is_two_fa_enabled) {
      return response(req, res, 404, true, false, "User has no 2FA enabled!");
    }

    // Check if 2FA is still active (not expired)
    if (!user.two_fa_token || user.two_fa_token_ttl <= new Date()) {
      return response(req, res, 404, true, false, "Invalid OTP or OTP Expired!");
    }

    // Compare auth token
    const match = await bcrypt.compare(authToken, user.two_fa_token);

    if (!match) {
      return response(req, res, 401, true, false, "Incorrect 2FA OTP!");
    }

    user.two_fa_token = null
    user.two_fa_token_ttl = null
    user.save()

    // Create JWT payload to generate a new token
    const jwt_payload = {
      _id: encrypt(user?._id?.toString()),
      name: encrypt(user?.name?.toString()),
      username: encrypt(user?.username?.toString()),
      email: encrypt(user?.email?.toString()),
    };

    // Generate JWT token
    const token = await signJWT(jwt_payload);

    user._doc.token = token;
    delete user._doc.__v;
    delete user._doc.password;
    delete user._doc.reset_token;
    delete user._doc.reset_token_ttl;

    return response(req, res, 200, false, user, "Login Successfully");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};



/**
 * Check if username exist
 */
const checkUsername = async (req, res) => {
  // return (await User.findOne({ username: req.body.username })) ? true : false;

  try {
    const usernameExist = await User.findOne({ username: req.body.username });
    if (!usernameExist)
      return response(req, res, 200, false, false, "Username does not exist!");
    else return response(req, res, 200, false, true, "Username already exist");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};


const verifyUserAccount = async (req, res) => {
  try {
    const { userId, verificationToken } = req.params
    const user = await User.findById(userId);

    if (!user) {
      return response(req, res, 404, true, false, "User not found!");
    }

    if (user.verified) {
      return response(req, res, 400, true, false, "User is already verified!");
    }

    if (!user.verification_token || !user.verification_token_ttl >= new Date()) {
      return response(req, res, 400, true, false, "Invalid verification token or verification OTP expired!");
    }


    const match = await bcrypt.compare(verificationToken, user.verification_token)
    if (!match) {
      return response(req, res, 400, true, false, "Incorrect verification OTP!");
    }

    user.verified = true
    user.verification_token = null
    user.verification_token_ttl = null
    user.save()

    return response(req, res, 200, false, {}, "User account verified!")
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};


const resendVerificationToken = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId);

    if (!user) {
      return response(req, res, 404, true, false, "User not found!");
    }

    if (user.verified) {
      return response(req, res, 400, true, false, "User is already verified!");
    }

    const token = generateId()

    // Hashed verification token
    const salt = bcrypt.genSaltSync(Number(keys.SALT_ROUNDS));
    const hashedVeificationToken = bcrypt.hashSync(token, salt);

    console.log({ hashedVeificationToken, token })

    user.verification_token = hashedVeificationToken
    user.verification_token_ttl = extendPeriod(10, 'm')
    user.save()


    // TODO: Send token via email to user


    return response(req, res, 200, false, {}, "Verification email sent!")
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};


module.exports = {
  authenticate2FA, update2FA, enable2FA, disable2FA,
  getUerDetailsById, getUerDetailsByUsername, getUerDetailsTokenless, getAllUsers,
  updateProfile, updateEmail, updatePassword, updateUsername,
  followUser, unfollowUser, checkUsername,
  verifyUserAccount, resendVerificationToken
};
