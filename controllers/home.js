const { populate } = require('../models/comments');
const Post = require('../models/post');
module.exports.home = (req, res) => {
    Post.find({}).sort({ $natural: -1 })
        .populate('user')
        .populate({
            path: 'comment',
            populate:'user'
        })
        .exec(function (err, post) {
        if (err) {
            console.log('err in finding the post');
        }
        
        return res.render('home', {
            title: "Instagram",
            posts : post
        });

    })
   
}