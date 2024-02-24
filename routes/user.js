// Importing required modules
const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user");

// Route for user signup
router
  .route("/signup")
  .get((req, res) => {
    res.render("users/signup.ejs"); // Render the signup page
  })
  .post(wrapAsync(userController.SignUp)); // Handle the signup form submission

// Route for user login
router
  .route("/login")
  .get(userController.showLogIn) // Show the login page
  .post(
    savedRedirectUrl, // Save the redirect URL for later use
    passport.authenticate("local", {
      failureRedirect: "/login", // Redirect to login page on authentication failure
      failureFlash: true,
    }),
    userController.LogIn // Handle the login form submission
  );

// Route for user logout
router.get("/logout", userController.logOut);

module.exports = router;
