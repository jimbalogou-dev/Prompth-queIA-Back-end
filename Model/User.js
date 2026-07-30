const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: false
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    country: {
        type: [String],
        default: []
    },

    roles: {
        type: [String],
        default: ['user']
    },
    preferredLanguage: {
        type: String,
        default: 'en',
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active'
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },

    phoneNumber: {
        type: String,
        default: ''
    },
     
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: null
    },
    birthDate: {
        type: Date,
        default: null
    },
    age: {
        type: Number,
        default: null
    },
     resetPasswordToken: {
  type: String,
  default: null
   },
     resetPasswordExpires: {
        type: Date,
       default: null
   },
});
module.exports = mongoose.model('User', userSchema);