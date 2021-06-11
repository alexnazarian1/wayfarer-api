const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema( {
    name: {type: String, required: true, unique: true},
    photo: {type: String, required: true},
    urlName: {type: String, unique: true},
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    ]
});

const City = mongoose.model('City', CitySchema);

module.exports = City;