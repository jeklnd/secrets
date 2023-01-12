const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router
  .route("/")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    User.create(user);
    res.redirect("/");
  });

module.exports = router;
