const express = require("express");
const { route } = require(".");
const router = express.Router();
const userController = require("../controller/user");

router.get("/profile", userController.profile);
router.get("/signin", userController.signin);
router.get("/signup", userController.signup);
router.post("/create", userController.create);
module.exports = router;
