const User = require("../model/User");
const { use } = require("../router");
const Post = require("../model/post");
const fs = require("fs");
const path = require("path");

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
  req.flash("success", "Logged in Successfully;");
  res.redirect("/");
};

module.exports.destorySession = (req, res) => {
  req.logout();
  req.flash("success", "Logged out Successfully;");
  res.redirect("/");
};

module.exports.showprofile = (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    res.render("showuser", { profile_user: user });
  });
};

module.exports.update = async (req, res) => {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(
  //     req.params.id,
  //     { $set: { name: req.body.name, email: req.body.email } },
  //     (err, user) => {
  //       console.log(user);
  //       res.redirect("/");
  //     }
  //   );
  // } else {
  //   console, log("not found");
  //   return res.status(401).send("Unauthorised ");
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      //we cant use now body-barser eacuse our form now has change to file
      User.uploadedAvatar(req, res, async function (err) {
        // console.log(req.file);

        // let photo=
        if (err) {
          // console.log("here");
          console.log("===multer Error:", err);
        }
        console.log(req.body.name);
        await console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;
        console.log("now");
        if (req.file) {
          //if avatar is already persent we will delete that path and for deleting we require fs and path
          if (user.avatar) {
            //fs going to that folder and delete that avatar
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          //this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        req.flash("success", "profile updated");
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  }
};
