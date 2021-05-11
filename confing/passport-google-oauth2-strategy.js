const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../model/User");

//tell passport to use google startegy
passport.use(
  new googleStrategy(
    {
      clientID:
        "578182535473-vs7rog73sdkr1fijh1el24jts6utv9hh.apps.googleusercontent.com",
      clientSecret: "NFZLw2IWAyhvsagNpuWE-lYe",
      callbackURL: "http://localhost:8081/users/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      //find user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(profile);
        if (user) {
          //if found set this user in req.user
          return done(null, user);
        } else {
          //if not found creaye the user and set it req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(err);
                return;
              } else {
                return done(null, user);
              }
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
