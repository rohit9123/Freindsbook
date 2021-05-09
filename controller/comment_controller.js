const Post = require("../model/post");
const Comment = require("../model/comment");
const { post } = require("./post");

module.exports.create = async (req, res) => {
  // const postid = req.params.id;
  // Post.findById(postid, function (err, post) {
  //   if (post) {
  //     Comment.create(
  //       {
  //         content: req.body.content,
  //         post: postid,
  //         user: req.user._id,
  //       },
  //       function (err, comment) {
  //         post.Comments.push(comment);
  //         //after updating save this
  //         post.save();
  //         // console.log(post);
  //         res.redirect("/");
  //       }
  //     );
  //   }
  // });
  try {
    let post = await Post.findById(req.params.id);
    if (post) {
      Comment.create(
        { content: req.body.content, post: post._id, user: req.user._id },
        (err, comment) => {
          post.Comments.push(comment);
          post.save();
          req.flash("success", "comment created");
          return res.redirect("back");
        }
      );
    } else {
      req.flash("error", "post not found");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return;
  }
};

module.exports.destroy = async (req, res) => {
  //finding first comment
  let comment = await Comment.findById(req.params.id).populate("post");

  if (comment) {
    //comment user id deleting ot the person which have created this post
    if (comment.user == req.user.id || comment.post.user == req.user.id) {
      const id = comment.post._id;
      comment.remove();
      //finding the post and  removing that comment
      req.flash("success", "comment deleted");
      let post = await Post.findByIdAndUpdate(
        id,
        { $pull: { Comments: req.params.id } },
        (err, post) => {
          return res.redirect("/");
        }
      );
    } else {
      req.flash("error", "not authroized");
      return res.redirect("/");
    }
  }
};
