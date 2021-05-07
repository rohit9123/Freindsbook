const express = require("express");
const router = express.Router();
const post_controller = require("../controller/post");

router.post("/create", post_controller.post);

module.exports = router;
