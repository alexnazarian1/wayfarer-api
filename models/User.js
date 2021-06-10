const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
    },
    username: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    email: {type: String, unique:true, required:true},
    profilePic: String,
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;