var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the survey results
  app.get("/api/footprints/", function(req, res) {
    db.Footprints.findAll({})
      .then(function(dbFootprint) {
        res.json(dbFootprint);
      });
  });

  // Get route for retrieving a single survey
  app.get("/api/footprints/:id", function(req, res) {
    db.Footprints.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbFootprint) {
        res.json(dbFootprint);
      });
  });

  // POST route for saving a new footprint survey
  app.post("/api/footprints", function(req, res) {
    console.log(req.body);
    db.Footprints.create({
      variable_name: req.body.variable_name,
      value: req.body.value
    })
      .then(function(dbFootprint) {
        res.json(dbFootprint);
      });
  });

};
