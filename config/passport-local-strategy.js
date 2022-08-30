const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password != password) { return done(null, false); }
            return done(null, user);
        });
    }
));

// serialize user

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserialize user function
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log("Error in finding the user");
            return;
        }
        done(null, user);
    });
});
// check for user is Authenticated
passport.checkAuthentication = function (req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}
// set authenticated user details to local for view
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;