const mongoose = require('mongoose');

const postSchema =new  mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
}, {
    timestamps: true
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
