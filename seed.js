const db = require('./models');
const data = require('./cityData.json');
const userData = require('./userData.json');

function handleError(err) {
  console.log(err);
  process.exit();
}

// Delete
db.City.deleteMany({}, (err, result) => {
  if (err) handleError(err);
  
  console.log(result.deletedCount,'city deleted');

  // Create
  db.City.create(data.cities, (err, seededCities) => {
    if (err) handleError(err);
    
    console.log(seededCities.length, 'cities created successfully');
    console.log('cities done!');

    db.User.deleteMany({}, (err, result) => {
      if (err) handleError(err);
      console.log(result.deletedCount,'user deleted');

      let cityId1;
      let cityId2;
      db.City.findOne({ name: 'San Francisco'}, (err, sfCity) => {
        if (err) handleError(err);
        cityId1 = sfCity._id;
        db.City.findOne({ name: 'Nashville'}, (err, nashCity) => {
          if (err) handleError(err);
          cityId2 = nashCity._id;
          userData.users.forEach((element, index)=> {
            index<3 ? element.city = cityId1 : element.city = cityId2;
          });
          db.User.create(userData.users, (err, seededUsers) => {
            if (err) handleError(err);
            console.log(seededUsers.length, 'users created successfully');
            console.log('users done!');
            process.exit();
          })
        })
      })
    })
  });
});
