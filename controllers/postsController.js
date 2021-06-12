const db = require('../models');

const index = async (req, res, next) => {
    try {
        const foundPosts = await db.Post.find({})
            .populate('comments');
        if (foundPosts.length === 0) return res.json({ message: 'No posts in database' });
        res.json({ posts: foundPosts })
    } catch (err) {
        next(err);
    }
}

const show = async (req, res, next) => {
    try {
        const foundPost = await db.Post.findById({ _id: req.params.id})
            .populate('comments');
        if (!foundPost) return res.json({ message: 'Post not found in database' });
        res.json({ post: foundPost });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const city = await db.City.findById({ _id: req.body.cityId });
        req.body.city = city.name;
        // const user = await db.User.findOne({ username: req.body.user });
        // if (!city || !user) return res.json({ message: 'City or User not found in database' });
        const newPost = await db.Post.create(req.body);
        city.posts.push(newPost._id);
        await city.save();
        // user.posts.push(newPost._id);
        // await user.save();
        res.status(201).json({ post: newPost });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const updatedPost = await db.Post.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new:true },
        )
        if (!updatedPost) return res.json({ message: 'Post not found in database '});
        res.status(201).json({ post: updatedPost });
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const deletedPost = await db.Post.findByIdAndDelete({ _id: req.params.id})
            .populate('comments');
        if (!deletedPost) return res.json({ message: 'Post not found in database' });
        const city = await db.City.findOne({ name: deletedPost.city });
        city.posts.remove(deletedPost._id);
        await city.save();
        const user = await db.User.findOne({ username: deletedPost.user });
        user.posts.remove(deletedPost._id);
        await user.save();
        const commentsToDelete = deletedPost.comments;
        commentsToDelete.forEach(async comment => {
            const userComment = await db.User.findOne({ username: comment.user });
            userComment.comments.remove(comment._id);
            await userComment.save();
            await db.Comment.findByIdAndDelete({ _id: comment._id });
        });
        res.json({ post: deletedPost });
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
