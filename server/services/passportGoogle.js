const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const keys = require("../config");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile"],
    },
    function verify(issuer, profile, cb) {
      console.log({ issuer }, { profile });
      // Do some database queries

      passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
          cb(null, { id: user.id });
        });
      });

      passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
          return cb(null, user);
        });
      });

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
