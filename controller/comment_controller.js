const Post = require("../model/post");
const Comment = require("../model/comment");

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
