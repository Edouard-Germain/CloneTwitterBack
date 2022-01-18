const express = require("express")
const app = express()
const passport = require("../config/passport")

const User = require("../models/User")


// Login d'un user existant

app.post('/login', passport.authenticate("local"), 
    (req, res) => {
        res.status(200).send("You're login")
    }
)


// Logout d'un user existant
  
app.delete('/logout', (req, res) => {
  req.logout()
  res.clearCookie('connect.sid', { path: '/' });
  res.status(200).send("You're logout")
})


// Créer un user => POST (C de CRUD pour CREATE)

app.post('/signup', async (req, res) => {
    const { password } = req.body

    try {
        if (password.length < 6) {
            res.status(400).json({ msg: "The password needs to be at least 6 characters long." });
            res.redirect("/signup");
        } else {
            const user = new User({ ...req.body })
            const userInsert = await user.save()
            res.json(userInsert)
            passport.authenticate('local')
        }       
    
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
  
})

module.exports = app 