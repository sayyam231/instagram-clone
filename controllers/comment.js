const Post = require('../models/post');
const Comment = require('../models/comments');
module.exports.create =async function (req, res) {
    try {
        let post =await Post.findById(req.body.post);

        let comment = await Comment.create({
            comment: req.body.comment,
            post: req.body.post,
            user: req.user._id
        });
                
        post.comment.push(comment);
        post.save();
        return res.redirect('back');
    } catch (err) {
        console.log("Error", err);
    }      
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } });
        }
        return res.redirect('back');
    } catch (err) {
        console.log("Error", err);
    }
}