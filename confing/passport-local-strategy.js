const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");

//authentication using passport
//setting up local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find the user and establish identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("erroe", err);
          console.log("error in finding");
          return done(err);
        }
        if (!user || user.password != password) {
          req.flash("error", "Invalid username/password");
          console.log("invalid username/password");

          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serailizing the user ton decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  //i am saving the user.id in the cookie and encrypting using express-session
  done(null, user.id);
});

//deserailtze the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding");
      return done(err);
    }
    return done(null, user);
  });
});

//this fuction is checking weather the user is login or not
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in then pass on the request to next function
  //isAuthenticated is inbuild function of passport which check for authentication
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not signed in
  res.redirect("/users/signin");
  // res.end();
  // next();
};

passport.setAuthenticatedUser = function (req, res, next) {
  // console.log(user);
  if (req.isAuthenticated()) {
    //req.user containt he current signed in user from the session cookie and we are just sending this to locals for
    //the view
    //req.locals
    res.locals.user = req.user;
    // next();
  }
  next();
};

module.exports = passport;
