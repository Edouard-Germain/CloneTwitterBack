const express = require("express")
const app = express()
const { body, validationResult } = require('express-validator')
const Comment = require ("../models/Comment")
const Tweet = require("../models/Tweet")
const User = require("../models/User")


/// Creation d'un tweet///
app.post('/',  body('content').isLength({max: 280}), async (req, res) => {

  try {
    const tweet = await new Tweet({ ...req.body })

    tweet.save((err, tweet) => {
      if (tweet) {
        res.json(tweet)
        User.updateOne({_id : tweet.user}, {$push: {tweets : tweet._id}}).exec()
        return
        }
      res.status(500).json({ error: err })
      })
    } catch (error) {
      console.log(err)
      res.status(500).json({ error: err })
    }
})

/// supression d'un tweet///

app.delete('/:id', async(req,res)=>{
  const {id} = req.params
  try {
    const deletedTweet = await Tweet.findById(id)
    await Tweet.deleteOne({_id : id}).exec()
    User.updateOne({_id : deletedTweet.user}, {$pull: {tweets : id}}).exec()

    res.status(200).json({ sucess : "Tweet deleted"})
  } catch (err) {
    res.status(500).json({error : err})
  }
})
/// Route pour récup les commentaires///
app.get('/:id', async(req,res)=>{
  const {id} = req.params
  try {
    const comments = await Tweet.findById(id)
    .populate('comment', 'content user')
    .exec()
    res.json(comments)
  } catch(err){
    console.log(err)
    res.status(500).json({error: err})
  }
})
app.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find().exec()

    res.json(tweets)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app
