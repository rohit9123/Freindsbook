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
      }
      console.log(post);
      return res.redirect("/");
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

      console.log(post.Comments.length);
      for (let i = 0; i < post.Comments.length; i++) {
        console.log(post.Comments[i].id);
      }

      res.render("show", { post: post });
    });
};

module.exports.destroy = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    // console;
    console.log(post);
    //id means converting the object id into string
    //we are deleting the post and the comment all associated with it
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        // post.remove();
        return res.redirect("/");
      });
    } else {
      console.log("not match");
      return res.redirect("/");
    }
  });
};
