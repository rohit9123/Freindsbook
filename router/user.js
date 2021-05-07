const express = require("express");
const { route } = require(".");
const router = express.Router();
const passport = require("passport");
const userController = require("../controller/user");

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/signin", userController.signin);
router.get("/signup", userController.signup);
router.post("/create", userController.create);
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);
router.get("/signout", userController.destorySession);

module.exports = router;
