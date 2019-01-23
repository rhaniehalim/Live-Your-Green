var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated")

//will need to be updated based on handlebars page links
module.exports = function(app) {
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })

    app.get("/home", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../views/home.handlebars"));
    })
}