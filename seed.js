const db = require('./models');
const cityData = require('./seedData/cityData.json');
const userData = require('./seedData/userData.json');
const postData = require('./seedData/postData.json');
const commentData = require('./seedData/commentData.json');

const bcrypt = require('bcrypt');
const saltRounds = 10;

seedData = async () => {
  try {
    const deletedCities = await db.City.deleteMany({})
    console.log(deletedCities.deletedCount,'city deleted');
    const seededCities = await db.City.create(cityData.cities);
    console.log(seededCities.length, 'cities created successfully');
    console.log('cities done!');

    const deletedUsers = await db.User.deleteMany({});
    console.log(deletedUsers.deletedCount,'user deleted');
    const cityId1 = seededCities[0]._id; // San Francisco
    const cityId2 = seededCities[3]._id; // Seattle
    const hashedPw = await bcrypt.hash('password', saltRounds);
    userData.users.forEach((element, index)=> {
      index < 3 ? element.city = cityId1 : element.city = cityId2;
      element.password = hashedPw;
    });
    const seededUsers = await db.User.create(userData.users);
    console.log(seededUsers.length, 'users created successfully');
    console.log('users done!');

    const deletedPosts = await db.Post.deleteMany({});
    console.log(deletedPosts.deletedCount, 'post deleted');
    const seededPosts = await db.Post.create(postData.posts);
    for (let i=0; i<seededPosts.length; i++) {
      const user = await db.User.findOne({ username: seededPosts[i].user });
      user.posts.push(seededPosts[i]._id);
      await user.save();
      const city = await db.City.findOne({ name: seededPosts[i].city });
      city.posts.push(seededPosts[i]._id);
      await city.save();
    };
    console.log(seededPosts.length, 'posts created successfully');
    console.log('posts done!');

    const deletedComments = await db.Comment.deleteMany({});
    console.log(deletedComments.deletedCount, 'comment deleted');;
    const seededComments = await db.Comment.create(commentData.comments);
    for (let i=0; i<seededComments.length; i++) {
      const user = await db.User.findOne({ username: seededComments[i].user });
      user.comments.push(seededComments[i]._id);
      await user.save();
      seededPosts[i].comments.push(seededComments[i]._id);
      await seededPosts[i].save();
      seededComments[i].post = seededPosts[i]._id;
      await seededComments[i].save();
    }
    console.log(seededComments.length, 'comments created successfully');
    console.log('comments done!');

    process.exit();

  } catch (err) {
    console.log(err);
    process.exit();
  }
}

seedData();
