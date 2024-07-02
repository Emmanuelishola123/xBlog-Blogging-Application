const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const { doesUserExist, isUsernameAvailable } = require("./userServices");
const { signUpOAuth } = require("./oauthServices");
const { generateRandomNumber } = require("../utils");
const keys = require("../config");

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.GITHUB_CLIENT_ID,
      clientSecret: keys.GITHUB_CLIENT_SECRET,
      callbackURL: keys.SERVER_BASEURL + "/api/v2/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const userGithubProfile = {
        avatar: profile.photos[0].value,
        email: profile.emails[0].value,
        bio: profile._json.bio,
        firstName: profile.displayName.split(" ")[0],
        lastName: profile.displayName.split(" ")[1],
        userExistsername: profile.username,
        provider: profile.provider,
      };

      const userExist = await doesUserExist(userGithubProfile.email);
      if (userExist) {
        return done(null, userGithubProfile);
      } else {
        let username = profile.username;
        if (!(await isUsernameAvailable(username))) {
          username =
            userGithubProfile.userExistsername + generateRandomNumber();
        }

        await signUpOAuth({
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          bio: profile._json.bio,
          name: profile.displayName,
          username,
        });
        return done(null, userGithubProfile);
      }
    }
  )
);

// Serialize user to the session
passport.serializeUser((user, done) => {
  console.log({ user });
  done(null, user.email);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  console.log({ id });
  done(null, id);
});

module.exports = passport;
