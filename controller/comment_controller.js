const Post = require("../model/post");
const Comment = require("../model/comment");
const { post } = require("./post");

module.exports.create = (req, res) => {
  const postid = req.params.id;
  Post.findById(postid, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: postid,
          user: req.user._id,
        },
        function (err, comment) {
          post.Comments.push(comment);
          //after updating save this
          post.save();
          // console.log(post);
          res.redirect("/");
        }
      );
    }
  });
};

module.exports.destroy = (req, res) => {
  Comment.findById(req.params.id)
    .populate("post")
    .exec((err, comment) => {
      if (comment) {
        if (comment.user == req.user.id || comment.post.user == req.user.id) {
          const id = comment.post._id;
          console.log(id);
          comment.remove();
          Post.findByIdAndUpdate(
            id,
            { $pull: { Comments: req.params.id } },
            (err, post) => {
              return res.redirect("/");
            }
          );
        } else {
          return res.redirect("/");
        }
      }
    });
};
