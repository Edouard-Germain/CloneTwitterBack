const express = require("express")
const app = express()

const User = require("../models/User")
const Tweet = require("../models/Tweet")
const Comment = require("../models/Comment")

// Créer un user => POST (C de CRUD pour CREATE)

app.post('/', async (req, res) => {
    const { tweet } = req.body
    const { comment } = req.body
  
    try {
      const user = await new User({ ...req.body })
      
      user.save(async (err, user) => {
        
        if (user) {
            const getTweet = await Tweet.findById(tweet)
            getTweet.users.push(user._id)
            getTweet.save()
    
            res.json(user)
            return
          }
    
          console.log(err)
          res.status(500).json({ error: err })
        })

    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  })

module.exports = app