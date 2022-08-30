module.exports.home = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('home', {
        title : "Instagram"
    });
}