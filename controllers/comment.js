const Post = require('../models/post');
const Comment = require('../models/comments');
module.exports.create = function (req, res) {
    console.log(req.body);
    Post.findById(req.body.post, (err, post) => {
        if (post) {
            Comment.create({
                comment: req.body.comment,
                post: req.body.post,
                user: req.user._id
            }, (err, comment) => {
                if (err) { console.log("Err in creating comment"); return; }
                post.comment.push(comment);
                post.save();
                return res.redirect('back');
            })
        }
    })
}