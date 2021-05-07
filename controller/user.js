const User = require("../model/User");
const { use } = require("../router");
const Post = require("../model/post");

module.exports.profile = (req, res) => {
  res.render("profile");
};
module.exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("signin");
  }
};
module.exports.signup = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
};

module.exports.create = function (req, res) {
  const { name, email, password, confirmPassword } = req.body;
  // const newuser={email:email,password:password,name:name};
  console.log(name, email);
  if (password !== confirmPassword) {
    return res.redirect("back");
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log("error in finding");
      return;
    }
    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("unable to create user");
          return;
        }
        console.log(user);
        return res.redirect("/users/signin");
      });
    } else {
      return res.redirect("./users/signup");
    }
  });
};

module.exports.createSession = function (req, res) {
  res.redirect("/");
};

module.exports.destorySession = (req, res) => {
  req.logout();
  res.redirect("/");
};
