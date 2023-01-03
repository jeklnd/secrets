// import modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// initialize
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
    res.render("home"); 
});

app.get("/login", (req, res) => {
    res.render("login"); 
});

app.get("/register", (req, res) => {
    res.render("register"); 
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
