const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {type: String, min_length: 1},
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;