const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const { Random } = require('meteor-random-universal');

const UserSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: () => Random.id(),
    //     required: true 
    // },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const UserModel = model('User', UserSchema);
module.exports = UserModel;
