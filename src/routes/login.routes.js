const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require("../models/user");
const passport = require("passport")
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");

router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
router.use(bodyParser.urlencoded({ extended: true }));
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
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const user = new User({
      email: req.body.username,
      password: req.body.password,
    });

    req.login(user, (err) =>{
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, () =>{
          res.redirect("/secrets");
        });
      }
    });
  
  });

module.exports = router;