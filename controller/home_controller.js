//module.exports.functionName=function(req,res){
// retturn

const Post = require("../model/post");
const { post } = require("../router");
const Comment = require("../model/comment");
const User = require("../model/User");

// }
// cont Post=require('./post');

module.exports.home = function (req, res) {
  // const showpost = Post.find({}, (err, posts) => {
  //   // console.log(book);
  //   if (err) {
  //     return;
  //   }
  //   console.log(posts);
  //   return res.render("home", { posts: posts });
  // });

  //what are doing here is we are populating the user table and then we are sending the data post and user
  Post.find({})
    .populate("user")
    .populate({
      path: "Comments  ",
      populate: {
        path: "user",
      },
    })
    .exec((err, posts) => {
      User.find({}, (err, users) => {
        return res.render("home", { posts: posts, all_users: users });
      });
    });
  // console.log(showpost);
};
