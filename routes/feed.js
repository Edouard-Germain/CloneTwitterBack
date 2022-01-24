const Tweet = require("../models/Tweet")
const User = require ("../models/User")
const express = require("express")
const app = express()

/// FEED PRINCIPAL
app.get('/',async (req, res)=>{
    if (req.user){
            try {
              const id = req.user._id
              const userFeed = await User.findById(id)
              const zeFeed = await Tweet
                .find({user : {$in:[userFeed.followings]}})
                .populate({ 
                    path : 'user',
                    model : 'User'
                })
                .sort({"createdAt": +1})
                
              res.json(zeFeed)
        } catch (err){
            console.log(err)
            res.status(500).json({ error: err })
        }
    } else{
        try {
            const tweets = await Tweet
                .find()
                .populate({ 
                    path : 'user',
                    model : 'User'
                })
                .exec()
            res.json(tweets)
        } catch (err){
            console.log(err)
            res.status(500).json({ error: err })
        }
    }

})

////// FEED D'UN UTILISATEUR

app.get('/:id', async (req, res) => {
    const { id } = req.params 
    try {
        const userTweets = await Tweet.find({user : id })
        res.json(userTweets)

    } catch (err) {
      res.status(500).json({ error: err })
      console.log(err)
    }
})

module.exports = app
