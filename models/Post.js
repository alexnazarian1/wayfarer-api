const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    body: {type: String, min_length: 1},
    title: {type: String, min_length: 1, max_length: 200},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;