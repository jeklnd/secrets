const express = require('express');
const router = express.Router();

router
    .route("/submit")
    .get((req, res) => {
        if (req.isAuthenticated()) {
          res.render("submit");
        } else {
          res.redirect("/login");
        }
      })

module.exports = router;