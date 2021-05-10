const mongoose = require("mongoose");
//first imported multer
const multer = require("multer");
//now importing path to join the path or which path have to use
const path = require("path");
const fs = require("fs");
//we are telling here we want to upload our profile pic
const AVATAR_PATH = path.join("/uploads/users/avatars");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    //pah of the fille
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb is callback function first argument be always be null and second argument where we want to upload the file
    //dirname will be give our current path and .. will use to send  to neighbour and
    //avatar path is ..+/uploads/users/avatars will git us where we want to upload

    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    //use to define what will be the name of file

    cb(null, file.fieldname + "-" + Date.now());
  },
});

//static function
//this function will be used to upload one pic on user model
//this is saying only one file will e uploaded one time
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);
module.exports = User;
