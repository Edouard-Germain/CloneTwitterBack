const express = require("express")
const app = express()
const passport = require("../config/passport")

const User = require("../models/User")

const { hasAutorization } = require("../middlewares/auth")


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
    const user = await User.findOne({ username : username })
    .populate('Tweet', 'content user comments')
    .exec()
    res.json(user)

  } catch (err) {
    res.status(500).json({ error: err })
  }
})


// Modifier un user

app.put('/:username', hasAutorization, async (req, res) => {
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