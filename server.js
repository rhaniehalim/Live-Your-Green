// *** Dependencies
// =============================================================
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
var MySQLStore = require('express-mysql-session')(session);

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//sets options for session table to be created
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'projectTwo'
};

//creates a session table
var sessionStore = new MySQLStore(options);

//Use sessions to track if user is logged in
app.use(session(
  {
    secret: "keyboard cat", 
    store: sessionStore,
    resave: false, 
    saveUninitialized: false 
  }
));

app.use(passport.initialize());
app.use(passport.session());


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
var authroutes = require("./routes/apiRoutes.js");
var routes = require("./routes/htmlRoutes.js");
var passroute = require("./routes/api_passport_route");

// app.use(authroutes);
app.use(routes);
app.use(passroute);

// require("./routes/htmlRoutes.js")(app);
// require("./routes/apiRoutes.js")(app);
// require("./routes/api_passport_route")(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  db.Member.findOne({where:{email: "me@gmail.com"}}).then(function(user){
    if (!user) {
      db.Member.build({email: "me@gmail.com", password: "admin"}).save();
    }
  })
}); 