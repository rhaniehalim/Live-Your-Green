var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated")
var express = require("express");
var router = express.Router();

//will need to be updated based on handlebars page links

    router.get("/", function(req, res) {
        console.log("home route hit")
        res.render("test");
    
    })

    router.get("/home", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../views/home.handlebars"));
    })

    module.exports = router;