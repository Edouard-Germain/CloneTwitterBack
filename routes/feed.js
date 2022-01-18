const Tweet = require("../models/Tweet")
const User = require ("../models/User")
const express = require("express")
const app = express()

app.get('/',async (req, res)=>{
    if (req.user){
            try {
              const id = req.user._id
              const userFeed = await User.findById(id)
              let following =  await userFeed.following
              console.log("userFeed", userFeed)
            //   Tweet.find
            //   .populate('following', 'tweets')
            //   .exec()   .sort({created: -1})
            // .then((result) => {
            //     res.send(result)
              res.json(userFeed)
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
