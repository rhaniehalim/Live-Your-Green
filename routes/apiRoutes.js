var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the profile page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("req: ", req.user.dataValues.id);

    // res.json({'id': req.user.dataValues.id} );
    res.json(`/index?user=${req.user.dataValues.id}`)

  });

  // app.post('/api/login', function(req, res, next) {
  //     passport.authenticate('local', function(err, user, info) {
  //         console.log("req.body", req.body)
  //     console.log("hitting /api/login after incorrect password");
  //     if (err) { return next(err); }
  //     if (!user) { 
  //         res.status(401);
  //         res.end(info.message);
  //         return;
  //     }

  //     res.json("index")

  //     })(req, res, next);
  // });


  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function () {

      //   res.status(200).render("profile", data.dataValues.email);
      res.redirect(307, "/api/login")


    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // GET route for getting all of the survey results
  app.get("/api/footprints/", function (req, res) {
    db.Footprint.findAll({}).then(function (surveys) {
      res.json(surveys);
    })
      .catch(function (err) {
        res.json(err);
        console.log(err);
      })

  });

  // Get route for retrieving a single survey
  app.get("/api/index", function (req, res) {
    db.Footprint.findOne({
      where: {
        id: req.body.userId
      }
    })
      .then(function (dbFootprint) {
        res.json(dbFootprint);
      });
  });

  // POST route for saving a new footprint survey
  app.post("/api/footprints", function (req, res) {
    console.log("req.body api route", req.body);
    // db.User.findAll({
    //   include: [
    //     {model: }
    //   ]
    // })

    db.Footprint.create({
      UserId: req.body.UserId,
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


      .then(function (dbFootprint) {
        res.json(dbFootprint);
        console.log("new survey", dbFootprint.dataValues);
      })
      .catch(function (err) {
        res.json(err);
        console.log(err);
      })
  });


//Earth911 API route
    app.post("/api/recycling", function (req, res) {
    var locationList = []
    var zipcode = req.body.zipcode;

    axios.get("http://api.earth911.com/earth911.getPostalData?postal_code=" + zipcode + "&country=US&api_key=" + process.env.API_KEY).then(function (response) {
      // console.log(response.data)
      var data = response.data;

      axios.get("http://api.earth911.com/earth911.searchLocations?latitude=" + data.result.latitude + "&longitude=" + data.result.longitude + "&api_key=" + process.env.API_KEY + "&max_results=10").then(function (response2) {

        var data2 = response2.data;
        console.log(data2);

        var results = 0;
        data2.result.forEach(function (result) {
          // console.log(result)

          axios.get("http://api.earth911.com/earth911.getLocationDetails?location_id=" + result.location_id + "&api_key=" + process.env.API_KEY).then(function(response3){
           results = results+1;
           console.log(results)
            var data3 = response3.data;
            var locationObj = data3.result[result.location_id];
            // console.log(locationObj);
            var object = {
              description: locationObj.description,
              address: locationObj.address,
              city: locationObj.city,
              country: locationObj.country,
            };
           
          
          
            // console.log(object);
            locationList.push(object);
            if (results == data2.num_results) {
              console.log("locationList", locationList)
              res.json(locationList)
            }
          })
            
        })
       
      })
     
    })
    // .then(function() {
    //   res.json(locationList);
    // });

    
  })
  // .then(function() {
  //   console.log("location list: ", locationList)
  // })

}

