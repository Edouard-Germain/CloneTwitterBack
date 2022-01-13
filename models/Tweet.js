const mongoose = require("mongoose")

const TweetSchema = new mongoose.Schema({
    content : {
        type : String
    },
    // retweets : [ 
    //             { type: Schema.Types.ObjectId, ref: "Tweet" }
    //         ]
},{
    timestamps : true
})

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = Tweet