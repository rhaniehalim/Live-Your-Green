var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(new LocalStrategy(
    {
        usernamefield: "email",
        passwordField: "password"
    },
    function (email, password, done) {
        console.log("passport.js email: ", email);
        console.log("passport.js password: ", password);
        console.log("passport.js done: ", done);
        
        db.Member.findOne({
            where: {
                email: email
            }
        
        }).then(function (err, user) {

            console.log(`login email: ${email}`);
            console.log(`login password: ${password}`);

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: "Email not found."
                });
            } else if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }

            return done(null, user); 
        });
    }
))

// //tracks authentication across HTTP requests
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});



module.exports = passport;