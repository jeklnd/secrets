const express = require("express");
const router = express.Router();
const passport = require("passport");

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile"] }));

router
  .route("/google/secrets")
  .get(passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  })

module.exports = router;

