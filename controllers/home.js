const { populate } = require('../models/comments');
const Post = require('../models/post');
module.exports.home = async (req, res) => {
    try {
    let post = await Post.find({}).sort({ $natural: -1 })
            .populate('user')
            .populate({
                path: 'comment',
                populate: 'user'
            });
        return res.render('home', {
            title: "Instagram",
            posts: post
        });
    } catch (error) {
        console.log("Error", error);
    }
}