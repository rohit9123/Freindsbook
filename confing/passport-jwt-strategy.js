const passport = require("passport");

const JWTSrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../model/User");
const key = "freindbook";
let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

passport.use(
  new JWTSrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log(err);
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
