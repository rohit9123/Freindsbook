// require("dotenv").config();
const express = require("express");
const port = 8081;
const app = express();
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const db = "mongodb+srv://Rohit:rohit143@cluster0.ywnv8.mongodb.net/friendbook";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database conected"));

// app.set is a object we can simply change the object
//setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(cookieParser());

// we are using index routin here
// any router starting from / we use  router/index
app.use("/", require("./router/index"));

app.listen(port, () => {
  console.log("listing on ${port}", port);
});
