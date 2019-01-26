var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

//will need to be updated based on handlebars page links
module.exports = function(app) {
    // app.get("*", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/index.html"));
    // })

    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
          res.redirect("index");
        }
        // res.sendFile(path.join(__dirname, "../public/signup.html"));
        res.render("landing")
    });

    app.get("/signup", function(req, res) {

        if (req.user) {
            res.redirect("/profile");
        }
        res.render("signup")
    });
    
    app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
        res.redirect("/profile");
    }
    res.render("login")
    });
    
    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/index", isAuthenticated, function(req, res) {
    res.render("index")
    });

    // footprint calculator route
    app.get("/footprints", isAuthenticated, function(req, res) {
        res.render("calculator");
    });

    // earth911 route
    app.get("/recyclinglocations", isAuthenticated, function(req, res) {
        res.render("maps");
    });


};