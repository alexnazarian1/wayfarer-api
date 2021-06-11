const db = require('../models');

const index = async (req, res, next) => {
    try {
        const foundUsers = await db.User.find({});
        if (foundUsers.length === 0) return res.json({ message: 'No users in database' });
        res.json({ users: foundUsers });
    } catch (err) {
        next(err);
    }
}

const show = async (req, res, next) => {
    try {
        const foundUser = await db.User.findOne({ username: req.params.username })
            .populate({
                path: 'posts',
                populate: { path: 'comments' }
            })
            .populate('comments');
        if (!foundUser) return res.json({ message: 'User not found in database' });
        res.json({ user: foundUser });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        req.body.username = req.body.username.replace(/[^a-zA-Z1-9]/g, "");
        const savedUser = await db.User.create(req.body);
        res.status(201).json({ user: savedUser });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        req.body.username = req.body.username.replace(/[^a-zA-Z1-9]/g, "");
        const updatedUser = await db.User.findOneAndUpdate(
            { username: req.params.username }, 
            req.body,
            { new:true }
        );
        if (!updatedUser) return res.json({ message: 'User not found in database' });
        res.status(201).json({ user: updatedUser });
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const deletedUser = await db.User.findOneAndDelete({ username: req.params.username })
            .populate({
                path: 'posts',
                populate: { path: 'comments' },
            })
            .populate('comments');
        const postsToDelete = deletedUser.posts;
        postsToDelete.forEach(async post => {
            const city = await db.City.findOne({ name: post.city });
            city.posts.remove(post._id);
            await city.save();
            post.delete();

            post.comments.forEach(async comment => {
                const user = await db.User.findOne({ username: comment.user });
                user.comments.remove(comment._id);
                await user.save();
                await db.Comment.findByIdAndDelete({ _id: comment._id });
            })

        });
        const userCommentsToDelete = deletedUser.comments;
        userCommentsToDelete.forEach(async comment => {
            const post = await db.Post.findById({ _id: comment.post });
            post.comments.remove(comment._id);
            await post.save();
            await db.Comment.findByIdAndDelete({ _id: comment._id });
        })
        res.json({ user: deletedUser });
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