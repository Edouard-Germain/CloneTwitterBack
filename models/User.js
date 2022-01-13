const { Schema, model } = require("mongoose")

const UserSchema = Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    pictureUrl: String, 
    bio: String, 
    birthDate: Date,
    location: String,
    followers: [
        { type: Schema.Types.ObjectId, ref: "User" },
    ],
    followings: [
        { type: Schema.Types.ObjectId, ref: "User" },
    ],
    tweets: [
        { type: Schema.Types.ObjectId, ref: "Tweet" },
    ],
    comments: [
        { type: Schema.Types.ObjectId, ref: "Comment" },
    ]
  }, {
    timestamps: true
  })
  
  const User = model('User', UserSchema)
  
  module.exports = User