const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {type: String, min_length: 1},
    title: {type: String, min_length: 1, max_length: 200},
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;