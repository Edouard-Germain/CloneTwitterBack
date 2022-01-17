const express = require("express")
const app = express()
const passport = require("../config/passport")

const User = require("../models/User")


// Login d'un user existant

app.post('/login', 
  passport.authenticate("local", { failureRedirect: '/login', failureMessage: true }), 
  (req, res) => {
      if (req.user) {
        req.logIn(req.user, err => {
          if (err) {
            console.log(err)
          }
        })
      }
})


// Logout d'un user existant
  
app.delete('/logout', (req, res) => {
  req.logout()
  res.status(200).send("ok")
})


// Créer un user => POST (C de CRUD pour CREATE)

app.post('/signup', async (req, res) => {
  
  try {
    const user = new User({ ...req.body })
    const userInsert = await user.save()
    res.json(userInsert)  

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})


module.exports = app