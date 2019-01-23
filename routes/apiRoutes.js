var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the survey results
  app.get("/api/footprint/", function(req, res) {
    db.Footprint.findAll({})
      .then(function(dbFootprint) {
        res.json(dbFootprint);
      });
  });

  // Get route for retrieving a single survey
  app.get("/api/footprint/:id", function(req, res) {
    db.Footprint.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbFootprint) {
        res.json(dbFootprint);
      });
  });

  // POST route for saving a new footprint survey
  app.post("/api/footprint", function(req, res) {
    console.log(req.body);
    db.Footprint.create({
      variable_name: req.body.variable_name,
      value: req.body.value
    })
      .then(function(dbFootprint) {
        res.json(dbFootprint);
      });
  });

};
