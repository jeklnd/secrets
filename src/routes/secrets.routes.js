const express = require("express");
const router = express.Router();
const passport = require("passport")
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/user");
const checkAuthenticated = require("../middleware/checkAuthenticated")

router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

// configure passport-local-mongoose
passport.use(User.createStrategy());

// configure sessions
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router
  .route("/")
  .get(checkAuthenticated, (req, res) => {
      res.render("secrets");
  });

module.exports = router;