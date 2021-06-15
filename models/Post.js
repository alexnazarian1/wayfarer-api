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
    body: {type: String, required: true},
    title: {type: String, required: true, maxLength: 200},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;