const Post = require("../model/post");
const mongoose = require("mongoose");
const Comment = require("../model/comment");

module.exports.post = async (req, res) => {
  const content = req.body.content;
  let post = await Post.create({
    content: req.body.content,
    user: req.user._id,
  });
  if (req.xhr) {
    return res.status(200).json({
      data: {
        post: post,
      },
      message: "Post created",
    });
  }

  req.flash("success", "post Pulished");
  return res.redirect("back");
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
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "post deleted",
        });
      }
      return res.redirect("back");
    } else {
      req.flash("erroe", "you cannot delete the");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return;
  }
};
