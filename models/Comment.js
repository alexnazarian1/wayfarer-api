const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    body: {type: String, required: true},
}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;