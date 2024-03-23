const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveOriginalUrl } = require("../middleware");
const UserController = require("../controller/users");

router.route("/signup")
.get( UserController.renderSignUpForm)
.post(wrapAsync( UserController.signUp));


router.route("/login")
.get(UserController.renderLoginForm)
.post(saveOriginalUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),UserController.login);


router.get("/logout",UserController.logout);

module.exports = router;