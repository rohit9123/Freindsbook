const express = require("express");
const router = express.Router();
const home_controller = require("../controller/home_controller");

router.get("/", home_controller.home);
// any router starting from '/user' will use ./user
router.use("/users", require("./user"));
router.use("/post", require("./post"));

//for any further routes accsess from here
//router.use('/routeName',require("location"))

module.exports = router;
