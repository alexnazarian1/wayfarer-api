const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
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

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;