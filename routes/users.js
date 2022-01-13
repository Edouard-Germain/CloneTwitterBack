const express = require("express")
const app = express()

const User = require("../models/User")
const Tweet = require("../models/Tweet")
const Comment = require("../models/Comment")


// Créer un user => POST (C de CRUD pour CREATE)

app.post('/', async (req, res) => {
  
    try {
      const user = new User({ ...req.body })
      const userInsert = await user.save()
      res.json(userInsert)    
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
})


// Récupérer tous les users 

app.get('/', async (req, res) => {
  
  try {
    const users = await User.find({}).exec()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})


// Récupérer un user 

app.get('/:username', async (req, res) => {
  const { username } = req.params
  
  try {
    const user = await User.findOne({ username : username }).exec()
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})


// Modifier un user

app.put('/:username', async (req, res) => {
  const { username } = req.params
  
  try {
    const user = await User.findOneAndUpdate(
      { username : username  },
      { ...req.body },
      { new: true }
    ).exec()

    res.json(user)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})


module.exports = app