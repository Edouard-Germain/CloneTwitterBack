const express = require("express")
const app = express()

const Tweet = require("../models/Tweet")

app.post('/', async (req, res) => {
  try {
    const tweet = await new Tweet({ ...req.body })

    tweet.save((err, garage) => {
      if (tweet) {
        res.json(tweet)
        return
      }
      console.log(err)
      res.status(500).json({ error: err })
    })
  } catch (error) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app