const User = require("../model/User");
const { use } = require("../router");

module.exports.profile = (req, res) => {
  res.end("<h1>profile<h1>");
};
module.exports.signin = (req, res) => {
  res.render("signin");
};
module.exports.signup = (req, res) => {
  res.render("signup");
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

module.exports.createSession = function (req, res) {};
