const Post = require('../models/post');
const Comment = require('../models/comments');
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

module.exports.showComment = function (req, res) {
    Post.findById(req.params.id).sort({ $natural: -1 })
        .populate('user')
        .populate({
            path: 'comment',
            populate: 'user'
        })
        .exec(function (err, post) {
            if (err) {
                console.log('err in finding the post');
            }
            
            return res.render('post_comment', {
                    title: "Instagram",
                    posts: post,
                   
            });
            
        });
}

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (post.user = req.user.id) {
            post.remove();
            Comment.deleteMany({ post: req.params.id }, (err) => {
                res.redirect('/');
            });
        } else {
            return res.redirect('back');
        }
    });
}