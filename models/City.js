const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema( {
    name: {type: String, required=true},
    photo: {type: String, required=true},
    urlName: String,
});

const City = mongoose.model('City', CitySchema);

module.exports = City;