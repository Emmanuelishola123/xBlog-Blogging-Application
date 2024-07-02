const User = require("../models/userModel");
const {
  doesUserExist,
  isUsernameAvailable,
  createNewUser,
} = require("./userServices");

const registerNewUser = async ({ email, username, password }) => {
  if (await doesUserExist(email)) {
    return { error: true, message: "User already exist!" };
  }

  if (!(await isUsernameAvailable(username))) {
    return { error: true, message: "Username not available!" };
  }

  // Hashed user password
  const salt = bcrypt.genSaltSync(Number(keys.SALT_ROUNDS));
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create new user in DB
  const newUser = await createNewUser({
    email,
    name,
    username: _username,
    password: hashedPassword,
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
};

const signInUser = async ({ username, password }) => {
  const user = await User.findOne({ email: req.body.email });

  // Check if user exist
  if (!user) {
    return response(req, res, 404, true, false, "User not found!");
  }
  // Compare plaintext password && hashed password from DB
  const match = bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return response(req, res, 401, true, false, "Incorrect Credentials");
  }

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

    return response(req, res, 302, false, null, "Complete 2FA Verification");
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

  return response(req, res, 200, false, user, "Login Successfully");
};

const sendPasswordResetLink = async ({}) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return response(
      req,
      res,
      404,
      true,
      false,
      "No account related to this email address was found!"
    );

  const resetToken = generateId();

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        reset_token: resetToken,
        reset_token_ttl: extendPeriod(12),
      },
    },
    {
      new: true,
    }
  );

  const link = `${keys.CLIENT_BASEURL}/auth/reset-password/${resetToken}`;

  // await sendMail({
  //   from: "noreply@getspire.io",
  //   fromName: "Spirē Technologies",
  //   to: email,
  //   subject: "Reset Password",
  //   templateID: 3748889,
  //   resetLink: link,
  // });

  response(
    req,
    res,
    200,
    false,
    link,
    `Recovery link has been sent to ${req.body.email}`
  );
};

const resetUserPassword = async ({}) => {
  const user = await User.findOne({ reset_token: req.params.resetToken });

  if (!user)
    return response(req, res, 404, true, false, "Invalid password reset link");

  const newResetToken = generateId();
  const currentTime = new Date(Date.now());

  if (currentTime.getTime() > user.reset_token_ttl.getTime()) {
    const token = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          reset_token: newResetToken,
          reset_token_ttl: extendPeriod(12),
        },
      },
      {
        new: true,
      }
    );

    const link = `${keys.CLIENT_BASEURL}/auth/reset-password/${token.reset_token}`;

    // await sendMail({
    //   from: "noreply@getspire.io",
    //   fromName: "Spirē Technologies",
    //   to: email,
    //   subject: "Reset Password",
    //   templateID: 3748889,
    //   resetLink: link,
    // });

    return response(
      req,
      res,
      403,
      true,
      false,
      `Token expired. A new password reset link has been sent to ${user.email}🤺`
    );
  }

  // Hashed user password
  const salt = bcrypt.genSaltSync(Number(keys.SALT_ROUNDS));
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        password: hashedPassword,
        reset_token: null,
        reset_token_ttl: null,
      },
    },
    {
      new: true,
    }
  );

  response(
    req,
    res,
    200,
    false,
    {},
    `Password reset for ${user.email} successful.`
  );
};

module.exports = {
  registerNewUser,
  signInUser,
  sendPasswordResetLink,
  resetUserPassword,
};
