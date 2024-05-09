const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const keys = require("../config");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/redirect/google",
      scope: ["profile"],
    },
    function verify(issuer, profile, cb) {
      console.log({ issuer }, { profile });
    }
  )
);

module.exports = passport;
