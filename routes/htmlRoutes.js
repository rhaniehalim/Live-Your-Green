var path = require("path");
//will need to be updated based on handlebars page links
module.exports = function(app) {
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })
}