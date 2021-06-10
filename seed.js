const db = require('./models');
const data = require('./cityData.json');

// Delete
db.City.deleteMany({}, (err, result) => {
  if (err) {
    console.log(err);
    process.exit();
  }
  
  console.log(result.deletedCount,'city deleted');

  // Create
  db.City.create(data.cities, (err, seededGames) => {
    if (err) {
      console.log(err);
      process.exit();
    }
    
    console.log(seededGames.length, 'cities created successfully');
    console.log('done!');

    process.exit();
  });
});
