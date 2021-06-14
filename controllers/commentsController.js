const db = require('../models');

const index = async (req, res, next) => {
    try {
        const foundComments = await db.Comment.find({});
        if (foundComments.length === 0) return res.json({ message: 'No comments in database' });
        res.json({ comments: foundComments });
    } catch (err) {
        next(err);
    }
}

const show = async (req, res, next) => {
    try {
        const foundComment = await db.Comment.findById({ _id: req.params.id });
        if (!foundComment) return res.json({ message: 'Comment not found in database' });
        res.json({ comment: foundComment });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const post = await db.Post.findById({ _id: req.body.post});
        // const user = await db.User.findOne({ username: req.body.user });
        // if (!post || !user) return res.json({ mesage: 'Post or User not found in database' });
        if (!post) return res.json({ mesage: 'Post not found in database' });
        req.body.post = post._id;
        const newComment = await db.Comment.create(req.body);
        post.comments.push(newComment._id);
        await post.save();
        // user.comments.push(newComment._id);
        // await user.save();
        res.status(201).json({ comment: newComment });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const updatedComment = await db.Comment.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new:true },
        );
        if (!updatedComment) return res.json({ message: 'Comment not found in database' });
        res.status(201).json({ comment: updatedComment });
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const deletedComment = await db.Comment.findByIdAndDelete({ _id: req.params.id });
        if (!deletedComment) return res.json({ message: 'Comment not found in database' });
        const post = await db.Post.findById({ _id: deletedComment.post });
        post.comments.remove(deletedComment._id);
        await post.save();
        const user = await db.User.findOne({ username: deletedComment.user });
        user.comments.remove(deletedComment._id);
        await user.save();
        res.json({ comment: deletedComment });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
  };
