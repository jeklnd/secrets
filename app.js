// import modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const open = require("open");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20");
const findOrCreate = require("mongoose-find-or-create");
const User = require("./src/models/user")

// create app
const app = express();

// connect to database
require("./src/configs/db")

// import configs
const config = require('./src/configs/config')

// import routes
require("./routes")(app);

// serve static files
app.use(express.static("public"));

// set view engine
app.set("view engine", "ejs");

// initialize bodyParser
app.use(bodyParser.urlencoded({ extended: true }));


// initialize passport middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


// configure passport-local-mongoose
passport.use(User.createStrategy());

// configure passport-google-oauth20
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

// // configure sessions
// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, {
//       id: user.id,
//       username: user.username,
//       picture: user.picture
//     });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });


app.listen(config.app.port, () => {
  console.log(`Server listening on port ${config.app.port}`);
});
