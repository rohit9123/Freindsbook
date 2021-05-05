// require("dotenv").config();
const express = require("express");
const port = 8081;
const app = express();
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const PassportLocal = require("./confing/passport-local-strategy");
const session = require("express-session");
const db = "mongodb+srv://Rohit:rohit143@cluster0.ywnv8.mongodb.net/friendbook";
const User = require("./model/User");

//it will take a parameter session to save our session
const MongoStore = require("connect-mongo")(session);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database conected"));

//for session
const dbs = mongoose.connection;

//may be used dont know
// dbs.on("error", console.error.bind(console, "error"));

// dbs.once("open", function () {
//   console.log("connected");
// });

//session end

// app.set is a object we can simply change the object
//setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(cookieParser());

//order matter seting our passport
app.use(
  session({
    Name: "Rohit",
    secret: "hellokumar",
    //dont save unauthenticated person
    saveUninitialized: false,
    //if a person is authenticated do not rewrite
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: new MongoStore(
      {
        mongooseConnection: dbs,
        autoRemove: "disable",
      },
      function (err) {
        console.log(err || "connect mongo db");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//this will check weather a cookie is set or not and the users save into local
app.use(passport.setAuthenticatedUser);
// we are using index routin here
// any router starting from / we use  router/index
app.use("/", require("./router/index"));

app.listen(port, () => {
  console.log("listing on ${port}", port);
});
