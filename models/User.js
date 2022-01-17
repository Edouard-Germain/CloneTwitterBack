const { Schema, model } = require("mongoose");
passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password should be atleast minimum of 6 characters"],
    },
    pictureUrl: {
        type: String, 
        default:
            "https://res.cloudinary.com/douy56nkf/image/upload/v1594060920/defaults/txxeacnh3vanuhsemfc8.png",
    },
    bio: String, 
    birthDate: Date,
    location: String,
    websiteUrl: String, 
    followers: [
        { type: Schema.Types.ObjectId, ref: "User" },
    ],
    followings: [
        { type: Schema.Types.ObjectId, ref: "User" },
    ],
    tweets: [
        { type: Schema.Types.ObjectId, ref: "Tweet" },
    ],
    retweets: [
        { type: Schema.Types.ObjectId, ref: "Tweet" },
    ],
    comments: [
        { type: Schema.Types.ObjectId, ref: "Comment" },
    ]
  }, {
    timestamps: true
  })
  

  UserSchema.plugin(passportLocalMongoose)

  const User = model('User', UserSchema)

  module.exports = User