var db = require("../models");
var passport = require("../config/passport");
var bcrypt = require("bcrypt-nodejs");
var express = require("express");
var router = express.Router();


    //route to log in member
    //need to add sucess/failure redirect once html routes are set
    // router.post("/api/login", passport.authenticate('local'), function (err, req, res) {
    //     if (err) throw err;
    //     res.json(req.body.email)
    // })

    // app.post("/api/login", passport.authenticate('local', {
    //     successMessage: "Login complete.",
    //     failureMessage: "Login unsuccessful."
    // }));


    router.post('/api/login',
    // wrap passport.authenticate call in a middleware function
    function (req, res, next) {

        console.log(req.body.email)
        console.log(req.body.password)
      // call passport authentication passing the "local" strategy name and a callback function
      passport.authenticate('local', function (error, email, info) {
        // this will execute in any case, even if a passport strategy will find an error
        // log everything to console
        console.log("error", error);
        console.log("email:", email);
        console.log("info", info);
  
        if (error) {
            console.log("there was an error")
          res.status(401).send(error);
        } else if (!email) {
            console.log("there was no user")
        //   res.status(401).send(info);
        } else {
          next();
        }
  
        res.status(401).send(info);
      })(req, res, next);
    },
  
    // function to call once successfully authenticated
    function (req, res) {
      res.status(200).send('logged in!');
    }
    );





    //route to sign members up
    router.post("/api/signup", function (req, res) {
        console.log(req.body);

        var email = req.body.email;
        var password = req.body.password;

        //hashes and salts entered password
        bcrypt.hash(password, null, null, function (err, hash) {
            if (err) throw err;

            //stores new member email and hashed password in db
            db.Member.create({
                email: email,
                password: hash
            }).then(function (member) {
                console.log(`member id: ${member.id}`)
                //logs in new user based on info just entered and stored
                req.login(member, function(){
                    res.json(member)
                    // res.redirect("/home")
                })
                
                //   res.redirect(307, "/api/login");
            }).catch(function (err) {
                console.log(err);
                res.json(err);
                // res.status(422).json(err.errors[0].message);
            });
        });
    });
    //tracks authentication across HTTP requests
    passport.serializeUser(function (member, cb) {
        cb(null, member);
    });

    passport.deserializeUser(function (member, cb) {
        cb(null, member);
    });

module.exports = router;