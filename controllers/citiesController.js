const db = require('../models');

const index = async (req, res, next) => {
  try {
    const foundCities = await db.City.find({})
      .populate('posts');
    if (foundCities.length === 0) return res.json({ message: 'No cities in database' });
    res.json({ cities: foundCities })
  }
  catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const foundCity = await db.City.findOne({ urlName: req.params.cityName })
      .populate({
        path: 'posts',
        populate: { path: 'comments' }
    });
    if (!foundCity) return res.json({ message: 'City not found in database' });
    res.json({ city: foundCity });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    let noSpecialChars = req.body.name.replace(/[^a-zA-Z ]/g, "");
    req.body.name = noSpecialChars;
    const cityUrl = noSpecialChars.split(' ').join('-').toLowerCase();
    req.body.urlName = cityUrl;
    const savedCity = await db.City.create(req.body);
    res.status(201).json({ city: savedCity });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let noSpecialChars = req.body.name.replace(/[^a-zA-Z ]/g, "");
    req.body.name = noSpecialChars;
    const cityUrl = noSpecialChars.split(' ').join('-').toLowerCase();
    req.body.urlName = cityUrl;
    const updatedCity = await db.City.findOneAndUpdate({ urlName: req.params.cityName }, req.body, { new:true });
    if (!updatedCity) return res.json({ message: 'City not found in database' });
    res.status(201).json({ city: updatedCity });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const deletedCity = await db.City.findOneAndDelete({ urlName: req.params.cityName })
      .populate({
        path: 'posts',
        populate: { path: 'comments' },
      });
    if (!deletedCity) return res.json({ message: 'City not found in database' });
    await db.User.updateMany(
      { city: deletedCity._id },
      { $unset: { city: '' }},
    );
    deletedCity.posts.forEach(async post => {
      await db.Post.findByIdAndDelete(post._id);
      const user = await db.User.findOne({ username: post.user });
      user.posts.remove(post._id);
      await user.save();
      post.comments.forEach(async comment => {
        await db.Comment.findByIdAndDelete(comment._id);
        const user = await db.User.findOne({ username: comment.user});
        user.comments.remove(comment._id);
        await user.save();
      });
    });
    res.json({ city: deletedCity });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};