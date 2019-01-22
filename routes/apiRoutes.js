var db = require("../models");
var passport = require("../config/passport");
var bcrypt = require("bcrypt-nodejs");


module.exports = function(app) {
    
    //route to log in member
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        
        res.json(req.body.email)
    })

    //route to sign members up
    app.post("/api/signup", function(req, res) {
        console.log(req.body);

        var email = req.body.email;
        var password = req.body.password;

        bcrypt.hash(password, null, null, function(err, hash) {
            // Store hash in your password DB.
            if (err) throw err;
        
            db.Member.create({
            email: email,
            password: hash
            }).then(function(member) {
                res.json(member)
            //   res.redirect(307, "/api/login");
            }).catch(function(err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
            });
        });
      });
    
}