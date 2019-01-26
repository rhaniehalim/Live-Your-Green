var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the profile page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/profile");
  });

  
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
        if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
        }
        else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
        }
  });

  // GET route for getting all of the survey results
  app.get("/api/footprints/", function(req, res) {
    db.Footprint.findAll({}).then(function(surveys) {
      res.json(surveys);
    })
    .catch(function(err) {
      res.json(err);
      console.log(err);
    })
   
  });

  // Get route for retrieving a single survey
  app.get("/api/footprints/:id", function(req, res) {
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
  app.post("/api/footprints", function(req, res) {
    console.log(req.body);
    db.Footprint.create({
      household_members: req.body.household_members,
      home_size: req.body.home_size,
      food_choice: req.body.food_choice,
      food_source: req.body.food_source,
      waterTotal: req.body.waterTotal,
      purchases: req.body.purchases,
      waste: req.body.waste,
      recycle: req.body.recycle,
      personal_vehicle: req.body.personal_vehicle,
      public_transportation: req.body.public_transportation,
      air_travel: req.body.air_travel,
      totalFootprint: req.body.totalFootprint
    })
      .then(function(dbFootprint) {
        res.json(dbFootprint);
        console.log("new survey", dbFootprint.dataValues);
      })
      .catch(function(err) {
        res.json(err);
        console.log(err);
      })
  });

};
