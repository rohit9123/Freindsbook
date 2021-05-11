const Post = require("../../../model/post");
const Comment = require("../../../model/comment");

module.exports.index = async (req, res) => {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "Comments",
      populate: {
        path: "user",
      },
    });
  return res.json(200, { message: "List of post", posts: [posts] });
};

module.exports.destroy = async (req, res) => {
  try {
    let post = Post.findById(req.params.id);
    post.remove();
    await Comment.deleteMany({ post: req.params.id });
    res.json(200, {
      message: "post deleted",
    });
  } catch (err) {
    return res.json(500);
  }
};
