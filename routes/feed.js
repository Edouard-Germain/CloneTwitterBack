const Tweet = require("../models/Tweet")
const express = require("express")
const app = express()

app.get('/',async (req, res)=>{
    if (req.user){
        try {
            const tweets = await Tweet.find().exec()
            res.json(tweets)
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
