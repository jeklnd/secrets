const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

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
  });

module.exports = router;