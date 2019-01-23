var db = require("../models");
var passport = require("../config/passport");
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app) {

    //route to log in member
    app.post("/api/login", passport.authenticate("local"), function (req, res) {

        res.json(req.body.email)
    })

    //route to sign members up
    app.post("/api/signup", function (req, res) {
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
}