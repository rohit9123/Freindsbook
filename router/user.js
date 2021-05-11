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
router.get("/update/please", (req, res) => {
  res.render("update");
});
router.get("/signout", userController.destorySession);
router.get("/profile/:id", userController.showprofile);
router.post("/update/:id", userController.update);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
module.exports = router;
