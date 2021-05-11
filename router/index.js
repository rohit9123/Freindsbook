const express = require("express");
const passport = require("passport");
const { Passport } = require("passport");
const router = express.Router();
const home_controller = require("../controller/home_controller");
const { route } = require("./comment");

router.get("/", home_controller.home);
// any router starting from '/user' will use ./user
router.use("/users", require("./user"));
// route.use('/user/profile/:id')
router.use("/post", passport.checkAuthentication, require("./post"));
router.use("/comment", passport.checkAuthentication, require("./comment"));
router.use("/api", require("./api"));

//for any further routes accsess from here
//router.use('/routeName',require("location"))

module.exports = router;
