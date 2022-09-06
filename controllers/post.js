const Post = require('../models/post');
module.exports.create = function (req, res) {
    Post.create({
        post: req.body.link,
        caption: req.body.caption,
        user: req.user._id
    }, (err, post) => {
        if (err) {
            console.log("Error in creating the post:");
        }
        return res.redirect('/');
    })
}