const mongoose = require("mongoose")
const { Schema, model } = require("mongoose")


const TweetSchema = new mongoose.Schema({
    content : {
        type : String,required: true, minlength: 1, maxlength: 280
    },
    user : {
        type : Schema.Types.ObjectId
    },
    comments : [
        {type: mongoose.Schema.Types.ObjectId, ref :"Comment"}
    ],
    retweets :[
        {type: mongoose.Schema.Types.ObjectId, ref :"User"}
    ] 
},{
    timestamps : true
})

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = Tweet