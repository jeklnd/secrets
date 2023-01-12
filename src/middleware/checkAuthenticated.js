module.exports = function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        console.log("User is authenticated");
        return next()
    } else {
        console.log("User is not authenticated");
        res.redirect("/login");
    }
}