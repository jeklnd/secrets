module.exports = function (app) {
    app.use("/auth", require("./src/routes/auth.routes"));
    app.use("/", require("./src/routes/index.routes"));
    app.use("/login", require("./src/routes/login.routes"));
    app.use("/logout", require("./src/routes/logout.routes"));
    app.use("/register", require("./src/routes/register.routes"));
    app.use("/secrets", require("./src/routes/secrets.routes"));
  };
