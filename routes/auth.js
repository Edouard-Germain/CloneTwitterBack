const express = require("express")
const app = express()
const passport = require("../config/passport")
const multer = require("multer")
const fs = require("fs")

const User = require("../models/User")

const upload = multer({ dest: 'public' })


// Login d'un user existant

app.post('/login', passport.authenticate("local"), 
    (req, res) => {
        if (req.user) {
            req.logIn(req.user, err => {
              if (err) {
                console.log(err)
              } else {
                res.json(req.user)
              }
            })
        }
    }
)

// Créer un user => POST (C de CRUD pour CREATE)

app.post('/signup', async (req, res) => {
   
    try {
        const user = new User({
            ...req.body, 
        })
        const userInsert = await user.save()
        console.log(userInsert)
        res.json({userInsert})
        passport.authenticate('local')

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: err })
    } 
})

// Logout d'un user existant
  
app.delete('/logout', (req, res) => {
    req.logout()
    res.clearCookie('connect.sid', { path: '/' });
    res.status(200).send("You're logout")
})

module.exports = app 