const express = require("express");
const passport = require("passport");
const { Passport } = require("passport");
const router = express.Router();
const comment_controller = require("../controller/comment_controller");

router.get("/destroy/:id", comment_controller.destroy);
router.post("/create/:id", comment_controller.create);

module.exports = router;
