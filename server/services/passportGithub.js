const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const keys = require("../config");

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.GITHUB_CLIENT_ID,
      clientSecret: keys.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/redirect/github",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log({ accessToken }, {refreshToken}, { profile });
      return done(null, profile);
    }
  )
);

module.exports = passport;
