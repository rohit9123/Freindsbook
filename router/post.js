const express = require("express");
const router = express.Router();
const post_controller = require("../controller/post");

router.post("/create", post_controller.post);
// router.post("/:id/comment", post_controller.comment);
router.get("/destroy/:id", post_controller.destroy);
router.get("/:id", post_controller.show);

module.exports = router;
