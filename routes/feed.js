const Tweet = require("../models/Tweet")
const User = require ("../models/User")
const express = require("express")
const app = express()

app.get('/',async (req, res)=>{
    if (req.user){
            try {
              const id = req.user._id
              const userFeed = await User.findById(id)
              const zeFeed = await Tweet.find({user : {$in:[userFeed.followings]}}).sort({"createdAt": -1})
                // .populate({
                //     path: 'followings',
                //     populate: {
                //         path: 'tweets',
                //         model: 'Tweet',
                //         options : {sort : {createdAt: -1}}
                //     }
                // })
                // console.log("zeFeed", zeFeed)
                // console.log("userfeed", userFeed)
            //   let following =  await userFeed.following
            //   Tweet.find
            //   .exec()   .sort({created: -1})
            // .then((result) => {
            //     res.send(result)
              res.json(zeFeed)
        } catch (err){
            console.log(err)
            res.status(500).json({ error: err })
        }
    } else{
        try {
            const tweets = await Tweet.find().exec()
            res.json(tweets)
        } catch (err){
            console.log(err)
            res.status(500).json({ error: err })
        }
    }

})

module.exports = app
