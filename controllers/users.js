const User = require("../models/user");

module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('sign-up', {
        title : "Sign-up"
    });
}
// creating the user in the Sign UP
module.exports.create = function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            console.log("error in finding the user in DB"+err);
        }
        if (!user) {
            User.create({
                username: req.body.username,
                name: req.body.name,
                password: req.body.password,
                phone_no: req.body.phone_no

            }, (err, user) => {
                if (err) {
                    console.log("Error in creating the user"+err);
                    return;
                }
                return res.redirect('/');
            });
        }
        else {
            res.redirect('back');
        }
    });
};
module.exports.profile = (req, res) => {

    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log("Error in finding the user");
            return;
        }
        if (user) {
            return res.render('profile', {
                title: "profile",
                user: user
            });
        }
        return res.redirect('back');
    })
};

// creatting session after sign in
module.exports.createSession = (req, res) => {
    
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log("Error in finding the user");
            return;
        }
        if (user) {
            return res.redirect('/');
        }
        return res.redirect('back');
    })
};

// sign out destroy session
module.exports.destroySession = (req, res)=>{
    req.logout((err) => {
        if (err) {
            console.log("Error in logging out");
            return res.redirect('back');
        }
        return res.redirect('/');
    })
}