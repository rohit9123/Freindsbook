// require("dotenv").config();
const express = require("express");
const port = 8081;
const app = express();
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const PassportLocal = require("./confing/passport-local-strategy");
const passportJWT = require("./confing/passport-jwt-strategy");
const passportGoogle = require("./confing/passport-google-oauth2-strategy");
const session = require("express-session");
const db = "mongodb+srv://Rohit:rohit143@cluster0.ywnv8.mongodb.net/friendbook";
const User = require("./model/User");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./confing/middleware");

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

// //may be used dont know
// dbs.on("error", console.error.bind(console, "error"));

// dbs.once("open", function () {
//   console.log("connected");
// });

//session end
//sass middleare is used before serever start beacuse we want template to use

app.use(
  sassMiddleware({
    src: "./assets/scss/",
    dest: "./assets/css/",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css",
  })
);

app.use(express.static("./assets"));
//make the upload path of avatar available to the public
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.urlencoded());
app.use(cookieParser());
// app.set is a object we can simply change the object
//setup view engine
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "public")));

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

//flash have to install after the session and passport are intialize
app.use(flash());
app.use(customMware.setflash);

// we are using index routin here
// any router starting from / we use  router/index
app.use("/", require("./router/index"));

app.listen(port, () => {
  console.log("listing on ${port}", port);
});
