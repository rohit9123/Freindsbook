const Post = require("../model/post");
const mongoose = require("mongoose");
const Comment = require("../model/comment");

module.exports.post = function (req, res) {
  const content = req.body.content;
  Post.create(
    {
      content: content,
      user: req.user._id,
    },
    (err, post) => {
      if (err) {
        console.log(err);
        req.flash("error", err);
        return res.redirect("/");
      } else {
        req.flash("success", "post created");
        console.log(post);
        return res.redirect("/");
      }
    }
  );
};

module.exports.show = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Post.findById(req.params.id)
    .populate("user")
    .populate({
      path: "Comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, post) => {
      if (err) {
        console.log(err);
      }

      res.render("show", { post: post });
    });
};

module.exports.destroy = async (req, res) => {
  try {
    //finding the post
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      //deleting the post
      post.remove();
      //deleting the comment associated with it
      req.flash("success", "post and associated comment  deleted");
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect("back");
    } else {
      req.flash("erroe", "you cannot delete the post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return;
  }
};
