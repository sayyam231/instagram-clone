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

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, (err, comment) => {
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } }, function (err, post) {
                return res.redirect('back');
            });

        } else {
            return res.redirect('back');
        }
    });
}