const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
