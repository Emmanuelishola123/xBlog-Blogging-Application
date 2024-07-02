const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const keys = require("../config");
const { generateOTP, extendPeriod, generateId } = require("../utils");
const { sendEmail } = require("./emailServices");
const { encrypt } = require("../utils/encryption");
const { signJWT } = require("../utils/jwt");
const { createNewUser } = require("./userServices");

const signInOAuth = async (email) => {
  const user = await User.findOne({ email });

  if (user.is_two_fa_enabled) {
    const otp = generateOTP();
    const salt = bcrypt.genSaltSync(Number(keys.SALT_ROUNDS));
    const hashed2FAToken = bcrypt.hashSync(otp, salt);

    user.two_fa_token = hashed2FAToken;
    user.two_fa_token_ttl = extendPeriod(10, "m");

    console.log({ otp, hashed2FAToken });
    user.save();

    // TODO: Send 2FA token via email to user
    sendEmail({
      body: { otp, hashed2FAToken },
      from: "xBlog <xblog@support.com>",
      subject: "2FA",
      to: user.email,
    });

    return {
      statusCode: 302,
      error: false,
      message: "Complete 2FA Verification",
      token: hashed2FAToken,
    };
  }

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

  return {
    statusCode: 200,
    error: false,
    message: "Successfully sign in",
    token,
  };
};

const signUpOAuth = async ({ email, username, avatar, name, bio }) => {
  // Create new user in DB
  const newUser = await User.create({
    email,
    username,
    avatar,
    name,
    bio,
  });

  // Create JWT payload to generate a new token
  //   const jwt_payload = {
  //     _id: encrypt(newUser?._id?.toString()),
  //     name: encrypt(newUser?.name?.toString()),
  //     username: encrypt(newUser?.username?.toString()),
  //     email: encrypt(newUser?.email?.toString()),
  //   };

  // Generate JWT token
  //   const token = await signJWT(jwt_payload);

  const verificationToken = generateId();
  const salt = keys.SALT_ROUNDS;
  const hashedVerificationToken = bcrypt.hashSync(verificationToken, salt);

  newUser.verification_token = hashedVerificationToken;
  newUser.verification_token_ttl = extendPeriod(10, "m");
  newUser.save();

  // TODO: Send verification token via email to user
  sendEmail({
    body: { verificationToken, hashedVerificationToken },
    from: "xBlog <xblog@support.com>",
    subject: "Verify your account",
    to: email,
  });

  return;
};

module.exports = { signInOAuth, signUpOAuth };
