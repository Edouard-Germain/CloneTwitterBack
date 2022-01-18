const { Schema, model } = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password should be atleast minimum of 6 characters"],
    },
    pictureUrl: {
        type: String, 
        default: "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
    },
    name: String,
    bio: String, 
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
  

  UserSchema.plugin(passportLocalMongoose, { usernameField: "email" })

  const User = model('User', UserSchema)

  module.exports = User