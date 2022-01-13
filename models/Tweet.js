const mongoose = require("mongoose")

const TweetSchema = new mongoose.Schema({
    content : {
        type : String
    },
    user : {
        type : String
    },
    // comments : [
    //     {type: Schema.Types.ObjectId, ref :" Comment"}
    // ],
    // retweets : [ 
    //             { type: Schema.Types.ObjectId, ref: "Tweet" }
    //         ]
},{
    timestamps : true
})

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = Tweet