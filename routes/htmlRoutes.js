var path = require("path");
//will need to be updated based on handlebars page links
module.exports = function(app) {
   // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route 
  app.get("/", function(req, res) {
    res.render("index");
  });

  // footprint calculator route
  app.get("/footprints", function(req, res) {
    res.render("calculator");
  });

  // earth911 route
  app.get("/recyclinglocations", function(req, res) {
    res.render("maps");
  });

  app.get("/userprofile", function(req, res) {
    res.render("user");
  });

};