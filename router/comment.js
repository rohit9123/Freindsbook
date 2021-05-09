const express = require("express");
const passport = require("passport");
const { Passport } = require("passport");
const router = express.Router();
const comment_controller = require("../controller/comment_controller");

router.post("/:id/create", comment_controller.create);

module.exports = router;
