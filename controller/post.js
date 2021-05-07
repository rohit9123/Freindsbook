const Post = require("../model/post");

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
